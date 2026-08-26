# Data Protection Impact Assessment — draft

Version: 26 August 2026

Status: completed engineering draft for the current free local version. Formal controller and Dutch legal sign-off remain required. The [Dutch DPA explains when a DPIA is required](https://www.autoriteitpersoonsgegevens.nl/themas/basis-avg/praktisch-avg/data-protection-impact-assessment-dpia).

## Scope and necessity

The app creates symbolic child profiles from birth data. Children are vulnerable data subjects and the output can be perceived as profiling. This DPIA therefore treats the activity as high-risk enough to require documented assessment even though the current architecture has no backend or external AI.

The service cannot produce a personalised natal chart without birth date/time and a location/timezone. Data minimisation removes legal name, photo, address, school, account and persistent coordinates. City search and calculation run locally.

## Data flow and access

- Personalised data: device localStorage only.
- Operator/admin access: none.
- External AI: none.
- Optional analytics: separate consent; content/PII prohibited.
- Hosting: public static files through GitHub Pages; GitHub may log visitor IP for security.
- Direct order enquiry: only after explicit checkbox/click; detailed birth data excluded.

## Risk assessment

| Risk | Initial | Safeguard | Residual |
|---|---:|---|---:|
| Device loss or shared-device access | High | Local deletion/export, no cloud copy, user warning | Medium |
| Unauthorised adult creates profile | High | 18+/authority gate, nickname, dispute/delete procedure | Medium |
| Coordinates reveal birthplace | High | Local city dataset; memory-only coordinates; automated removal | Low |
| Child profile treated as fact | High | Reflective wording; no diagnosis/significant decisions; terms | Medium |
| Health/special-category question stored | Critical | Local pre-storage block; zero text retention | Low |
| External AI receives child data | Critical | No external AI in this version; feature gate policy | Low |
| Analytics receives PII/content | High | Prior consent, strict event/parameter allow-list, tests | Low |
| Deletion leaves linked records | High | Child cascade for notes/history/selection/scent; regression test | Low |
| History accumulates | High | 90-day automatic expiry and manual clear | Low |
| Order sends unexpected data | High | Excludes birth details; explicit transmission checkbox | Low |
| XSS reads local data | High | Static app, dependency pinning, meta CSP, escaping, no inline user HTML | Medium |
| User loses local data | Medium | JSON + readable export; clear warning that local data is not recoverable | Low |
| Child turns 16 and rights ignored | High | direct privacy contact and DSR procedure | Low/Medium |

## Proportionality and rights

Users receive layered notice, a full privacy/cookie/terms page, export, correction through profile recreation, profile deletion, history deletion, all-data deletion, consent withdrawal and a direct privacy contact. There is no solely automated decision with legal or similarly significant effect.

## Residual-risk decision

No Critical residual risk remains in the implemented local architecture. Medium risks require monitoring and user communication. Adding any backend, AI, photos, payments, account sync, advertising or employee access invalidates this conclusion and blocks release pending a new DPIA.

## Consultation/sign-off

- Controller decision: __________________ / date: __________
- Privacy/security reviewer: ____________ / date: __________
- Dutch privacy counsel: _______________ / date: __________
- Prior consultation with AP required? Yes / No — rationale: __________________
