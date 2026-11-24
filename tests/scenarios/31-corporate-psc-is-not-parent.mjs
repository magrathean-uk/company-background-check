import { appointment, company, companyRoutes, corporatePsc, director, list } from './_helpers.mjs';

// Reuse existing fictional fixture names; company numbers are deliberately unissued ZZ numbers.
const target = company('ZZ000031', 'PLACEHOLDER OPCO LTD');
const psc = (name, number, control, extra = {}) => corporatePsc(name, number, 'England', { natures_of_control: control, ...extra });
const unresolved = name => ({ name, owner_of: target.company_name, reason: 'PSC record does not establish majority control' });

export default {
  description: 'Minority, influence-only, trust, missing-control and ceased corporate PSCs do not become parents or import their financial flags',
  args: [target.company_number],
  expect: {
    exit: 0,
    flags: [],
    fields: {
      'company.parents.length': 0,
      'company.ir35_size.part_of_group': false,
      'pscs.length': 4,
      'pscs.0.control': ['ownership-of-shares-25-to-50-percent', 'voting-rights-25-to-50-percent'],
      'meta.parents_not_followed': [
        unresolved('Placeholder Holdco Limited'),
        unresolved('Placeholder Topco Plc'),
        unresolved('Placeholder Ultimate Limited'),
        unresolved('Placeholder Midco Limited'),
        { name: 'Placeholder Former Owner Limited', owner_of: target.company_name, reason: 'PSC ceased on 2024-12-17' },
      ],
    },
  },
  routes: {
    ...companyRoutes(target, {
      officers: [director('EXAMPLE, Alpha Twenty', 'OFF-ALPHA31', { month: 5, year: 1980 })],
      pscs: [
        psc('Placeholder Holdco Limited', 'ZZ000311', ['ownership-of-shares-25-to-50-percent', 'voting-rights-25-to-50-percent']),
        psc('Placeholder Topco Plc', 'ZZ000312', ['significant-influence-or-control']),
        psc('Placeholder Ultimate Limited', 'ZZ000313', ['ownership-of-shares-75-to-100-percent-as-trust']),
        psc('Placeholder Midco Limited', 'ZZ000314', []),
        psc('Placeholder Former Owner Limited', 'ZZ000315', ['ownership-of-shares-75-to-100-percent'], { ceased_on: '2024-12-17' }),
      ],
    }),
    '/officers/OFF-ALPHA31/appointments': list(appointment(target.company_number, target.company_name)),
    ...companyRoutes(company('ZZ000311', 'PLACEHOLDER HOLDCO LTD', { accounts: { overdue: true, next_due: '2026-01-31', last_accounts: {} } })),
    ...companyRoutes(company('ZZ000312', 'PLACEHOLDER TOPCO PLC', { company_status: 'liquidation', has_insolvency_history: true }), { insolvency: { cases: [{ type: 'creditors-voluntary-liquidation' }] } }),
    ...companyRoutes(company('ZZ000313', 'PLACEHOLDER ULTIMATE LTD', { accounts: { overdue: true, next_due: '2026-01-31', last_accounts: {} } })),
    ...companyRoutes(company('ZZ000314', 'PLACEHOLDER MIDCO LTD', { accounts: { overdue: true, next_due: '2026-01-31', last_accounts: {} } })),
    ...companyRoutes(company('ZZ000315', 'PLACEHOLDER FORMER OWNER LTD', { company_status: 'liquidation', has_insolvency_history: true })),
  },
};
