---
tags: [company-background-check]
max_turns: 60
timeout_seconds: 1200
allowed_tools: [Read, Write, Edit, Bash, Glob, Grep, Skill, WebSearch, WebFetch]
env:
  EVAL_CH_OFFLINE: "1"
---

I'm considering a job with https://draining.example/. Check the company, its money and who is behind it. Are its funding and credibility claims solid? Someone mentioned a £5.5m valuation and an umbrella company.

Here is the material I collected on 24 November 2026 at 09:00 UTC. Use it alongside the company records. Keep the output as the usual printable company report.

## Source pack

| Source | Date / inspection | Content |
|---|---|---|
| https://draining.example/legal | Website text, retrieved 24 November 2026 | “Draining is operated by PLACEHOLDER DRAINING LTD, company ZZ000013, England and Wales. We develop software.” |
| https://hardware-news.example/draining | Article dated 10 June 2026 | “Draining, the US semiconductor business at drainingchips.example, raises $900m.” The article names no UK entity. |
| https://registry-archive.example/ZZ000013/accounts/2024 | Indexed text of accounts for 30 June 2024, filed 1 March 2025; original PDF fetch failed | Company ZZ000013, PLACEHOLDER DRAINING LTD. All figures in GBP, unscaled. Fixed assets 25,000; current assets 150,000; creditors due within one year (75,000); net assets 100,000; capital and reserves 100,000; average employees 4. The excerpt does not contain a cash balance, turnover or the complete notes. The filing identifier is TX-DOC-ZZ13-2024. |
| https://capital-data.example/company/ZZ000013 | Publisher's company record, updated 23 November 2026 | “Total equity raised: £3.2m. Latest round: approximately £3.1m, March 2026.” Investor details and post-money valuation are subscriber-only. |
| https://deals.example/news/draining-2026 | Article dated 10 June 2026 | “PLACEHOLDER DRAINING LTD secures an estimated £3.1m in new funding.” It refers to shares allotted on 19 March 2026. No bank evidence is supplied. |
| https://deals.example/filing-notes/ZZ000013 | Publisher's filing commentary, dated 17 June 2026 | “Statement of capital: GBP 14.6912. A replacement SH01 corrects the earlier March allotment filing.” The commentary gives no subscription price or cash proceeds and is not the original filing. |
| https://registry-archive.example/ZZ000013/psc-history | Archived PSC extract as at 30 April 2016 | “Placeholder Former Owner Limited (ZZ000179): more than 25% but no more than 50% of shares and votes. Ceased on 6 April 2016.” This is historical material, not the current PSC list. |
| https://draining.example/investors | Company statement dated 20 November 2026 | “Placeholder Former Owner Limited retains 10% of ordinary shares and votes. Ms Phi Example holds the remaining 90%. The corporate shareholder has no board-appointment rights or other control rights. Our adviser helps introduce potential investors.” No signed cap table accompanies the statement. |
| https://fundraising-adviser.example/portfolio/draining | Adviser's public page, dated 12 November 2026 | “Draining is a portfolio company. We provide investor introductions and fundraising communications.” No investment amount or shareholding is stated. |
| https://enterprise-programme.example/members/draining | Programme operator's own page, dated 5 September 2026 | “Draining is a member of our law-firm enterprise programme and joined our founders' event.” No audit, certification, investment or customer contract is mentioned. |
| https://software-directory.example/draining | Directory listing, reviewed 1 October 2026 | “Draining: a software company in Testtown. Company website: draining.example.” No technical assessment is described. |
| https://capital-data.example/company/ZZ000013/valuation | Free preview, retrieved 24 November 2026 | “Post-money valuation: Sign up to see. Lorem ipsum dolor sit amet. Shareholder details: 8888888888. Sign up to unlock.” |
| https://draining.example/updates/2026-11 | Company update dated 20 November 2026 | “We have a promising pipeline and a proven approach.” No paying-customer count, revenue, audit report, current cash balance or burn figures are given. |

(Test setup: the domain, source pack, company and related entities are fictional. All .example URLs above are reserved test domains and are not live pages; treat the supplied text as retrieved source material. Run the bundled check normally against the offline records for ZZ000013 from tests/scenarios/13-accounts-fall-pdf.mjs. The current PSC record there is authoritative; the historical extract and unverified company statement supplement it, rather than replace it. The mock provides 2025 iXBRL accounts with 2024 comparatives. Web searches cannot add real information about this company, and the 2024 original PDF remains inaccessible. Complete the report without modifying the script or fixtures.)
