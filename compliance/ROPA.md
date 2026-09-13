# Record of processing activities — current free local-first version

Version: 13 September 2026

## Parent account and authentication

- Controller: Ella Kristioglo, Netherlands.
- Purpose: create and authenticate an adult parent/legal-guardian account and allow in-app account deletion.
- Data subjects: adult users.
- Categories: e-mail address, Supabase user ID, session tokens and authentication/security metadata.
- Proposed Article 6 basis: performance of the user-requested service (Article 6(1)(b)); Dutch legal confirmation required.
- Processor: Supabase, Inc.; exact project region, DPA and transfer mechanism require controller verification.
- Retention: until account deletion, subject to Supabase log/backup retention settings that must be recorded.
- Safeguards: passwordless one-time code, no public client-side bypass, authenticated self-deletion Edge Function, and no child profile data in Supabase.

## Local child-profile and astrology functions

- Controller: Ella Kristioglo, Netherlands.
- Purpose: deliver user-requested natal calculations and reflective content.
- Data subjects: child and adult user.
- Categories: nickname, birth details, timezone, derived chart, local notes and feature results.
- Proposed Article 6 basis: legitimate interests (Article 6(1)(f)); final Dutch legal confirmation required.
- Recipients: none for personalised content.
- Transfers: none.
- Retention: user-controlled; coordinates immediate deletion; histories maximum 90 days.
- Safeguards: local-only storage, nickname prompt, authority gate, coordinate minimisation, deletion cascade, export, sensitive-input block.

## Consent-gated product analytics

- Purpose: understand broad feature usage and technical operation.
- Data subjects: visitor/device user.
- Categories: allow-listed event name, language, broad topic/mode, page location and technical data collected by GA.
- Basis: consent.
- Recipient: Google Analytics / Google Ireland Limited.
- Transfers: document applicable Google mechanism and DPA before launch.
- Retention: browser cookie maximum 180 days; GA property controls must remain minimised.
- Safeguards: denied by default, equal accept/reject controls, persistent withdrawal, no PII/content parameters, enhanced measurement disabled.

## Static hosting/security

- Purpose: serve the application and protect the hosting service.
- Data: request/IP/security metadata handled by GitHub.
- Vendor: GitHub Pages.
- Basis/role: document GitHub role and terms in the vendor review.
- Safeguards: HTTPS, no frontend secrets, CSP/referrer policy, static application files and a narrowly scoped authenticated deletion function.

## Direct candle enquiry

- Purpose: user-initiated contact about an adult-only Parent Scent candle.
- Data: adult name, contact and scent summary; no detailed birth data.
- Recipients: Ella and the user-selected WhatsApp or email provider.
- Trigger: explicit checkbox and button click.
- The app does not store the contact fields or complete a purchase.
