import { appointment, company, companyRoutes, corporatePsc, director, list } from './_helpers.mjs';

const target = company('ZZ000032', 'PLACEHOLDER SUBSIDIARY LTD');
const midco = company('ZZ000321', 'PLACEHOLDER MIDCO LTD');
const holdco = company('ZZ000322', 'PLACEHOLDER HOLDCO LTD', { accounts: { overdue: true, next_due: '2026-01-31', last_accounts: {} } });

export default {
  description: 'A minority link seen first does not prevent following the same owner through a later majority-control route',
  args: [target.company_number],
  expect: {
    exit: 0,
    flags: ['high parent_accounts_overdue'],
    fields: {
      'company.parents.length': 2,
      'company.parents.0.number': midco.company_number,
      'company.parents.0.control': ['voting-rights-50-to-75-percent'],
      'company.parents.1.number': holdco.company_number,
      'company.parents.1.level': 2,
      'company.parents.1.control': ['right-to-appoint-and-remove-directors'],
      'company.ir35_size.part_of_group': true,
      'flags.0.record': 'parent',
      'flags.0.text': 'Parent PLACEHOLDER HOLDCO LTD: Accounts overdue (were due 2026-01-31)',
      'meta.parents_not_followed': [{ name: 'Placeholder Holdco Limited', owner_of: target.company_name, reason: 'PSC record does not establish majority control' }],
    },
  },
  routes: {
    ...companyRoutes(target, {
      officers: [director('EXAMPLE, Alpha Twenty', 'OFF-ALPHA32', { month: 5, year: 1980 })],
      pscs: [
        corporatePsc('Placeholder Holdco Limited', holdco.company_number, 'England', { natures_of_control: ['ownership-of-shares-25-to-50-percent'] }),
        corporatePsc('Placeholder Midco Limited', midco.company_number, 'England', { natures_of_control: ['voting-rights-50-to-75-percent'] }),
      ],
    }),
    '/officers/OFF-ALPHA32/appointments': list(appointment(target.company_number, target.company_name)),
    ...companyRoutes(midco, { pscs: [corporatePsc('Placeholder Holdco Limited', holdco.company_number, 'England', { natures_of_control: ['right-to-appoint-and-remove-directors'] })] }),
    ...companyRoutes(holdco),
  },
};
