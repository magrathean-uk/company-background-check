import { appointment, company, companyRoutes, corporatePsc, director, list } from './_helpers.mjs';

const target = company('ZZ000040', 'PLACEHOLDER OPCO LTD');
const niParent = company('ZZ000401', 'PLACEHOLDER BELFAST HOLDINGS LTD');
const pscUrl = 'https://find-and-update.company-information.service.gov.uk/company/ZZ000040/persons-with-significant-control';

// Older Northern Ireland companies often state only the NI legislation as their governing law
const governedBy = (name, number, authority) => ({
  ...corporatePsc(name, number, undefined),
  identification: { registration_number: number, legal_form: 'Limited Company', legal_authority: authority },
});

export default {
  description: 'A parent governed by Northern Ireland company law is followed, and a corporate beneficial owner is recorded as not followed',
  args: [target.company_number],
  expect: {
    exit: 0,
    flags: [],
    fields: {
      'company.parents.length': 1,
      'company.parents.0.number': 'ZZ000401',
      'meta.parents_not_followed': [
        { name: 'Placeholder Overseas Owner SA', owner_of: target.company_name, reason: 'registered beneficial owner, not a UK PSC', psc_url: pscUrl },
      ],
    },
  },
  routes: {
    ...companyRoutes(target, {
      officers: [director('EXAMPLE, Alpha Forty', 'OFF-ALPHA40', { month: 5, year: 1980 })],
      pscs: [
        governedBy('Placeholder Belfast Holdings Limited', 'ZZ000401', 'Companies (Northern Ireland) Order 1986'),
        { ...corporatePsc('Placeholder Overseas Owner SA', 'ZZ000402', 'Luxembourg'), kind: 'corporate-entity-beneficial-owner' },
      ],
    }),
    '/officers/OFF-ALPHA40/appointments': list(appointment(target.company_number, target.company_name)),
    ...companyRoutes(niParent),
  },
};
