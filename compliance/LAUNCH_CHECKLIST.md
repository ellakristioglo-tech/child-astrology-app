# Launch checklist — current free local version

Version: 28 August 2026

Legend: **DONE** implemented/verified in code; **N/A** feature does not exist and is blocked from silent addition; **HUMAN** requires controller/lawyer/vendor action.

| # | Requirement from report | Status | Evidence/action |
|---:|---|---|---|
| 1 | Parent-only onboarding | DONE | 18+ gate before the first Add Child action |
| 2 | Parent/legal-authority checkbox | DONE | Confirmation for every new child; timestamp/version saved with that profile; nickname guidance and child-privacy link |
| 3 | Nickname instead of legal name | DONE | Field and notice say nickname/full name not required |
| 4 | Remove child photo | DONE | No photo field/upload |
| 5 | Server-side geocoding | DONE by safer local equivalent | Bundled GeoNames search; no query leaves device |
| 6 | Delete coordinates after calculation | DONE | Transient calculation; migration removes old coordinates |
| 7 | Separate raw inputs/derived profile | DONE | Stored inputs exclude coordinates; chart stored separately |
| 8 | Never send identity/payment data to AI | N/A + gated | No external AI/payment; AI policy prohibits addition |
| 9 | Minimum AI payload | N/A + gated | No external AI; future feature gate documented |
| 10 | Pre-AI sensitive classifier | DONE locally | Runs before history/analytics/calculation |
| 11 | Health/mental-health prompts do not reach LLM | DONE | No LLM; prompts blocked locally |
| 12 | Sensitive prompts not stored | DONE | Zero-content retention |
| 13 | Output diagnosis/certainty filter | DONE by controlled templates | No model output; restricted deterministic responses |
| 14 | Persistent AI/automation disclosure | DONE accurately | Says local automated rules, not person/external AI |
| 15 | No PII/prompts in logs | DONE for app | No app logging; analytics allow-list excludes content |
| 16 | Child object authorization | N/A | No accounts/backend/remote child objects; device origin boundary only |
| 17 | Delete Child cascade | DONE | Child, notes, history, selection and scent cleared |
| 18 | Delete Account cascade | N/A + equivalent DONE | No account; Delete all clears all known app keys/cookies |
| 19 | Delete AI history | DONE equivalent | “Delete question history” |
| 20 | Delete Tarot history | DONE | Tarot history is never stored |
| 21 | Export and restore data | DONE | JSON + readable HTML export; confirmed JSON import for custom-domain/device migration; analytics consent and separate general 18+ confirmation excluded from import |
| 22 | Backup deletion lifecycle | N/A | No application backend/backups; local-only disclosure |
| 23 | Cookie consent before optional trackers | DONE | GA script created only after consent; accept/reject/settings |
| 24 | Subscription cancellation | N/A | No subscription or paywall |
| 25 | Statutory online withdrawal | N/A | No online contract/purchase; candle is direct enquiry |
| 26 | Admin MFA/RBAC | N/A | No admin panel/backend |
| 27 | Secret manager | N/A | No frontend secrets/API keys |
| 28 | Security/audit logging | N/A for app backend | No backend; GitHub handles hosting security logs |
| 29 | Rate limiting/account takeover protection | N/A | No auth/API/account |
| 30 | Automated privacy/security tests | DONE | Node regression tests run before Pages deployment |
| 31 | Product mission and parent-first positioning | DONE | `founder-pack/PRODUCT_VISION.md`; North Star is one useful action a parent can try today |
| 32 | Eight-section Child Code | DONE | Personality, emotions, communication, learning, strengths, challenges, support and current age context |
| 33 | Non-diagnostic language constitution | DONE | `founder-pack/CONTENT_ASTROLOGY_FRAMEWORK.md`; prohibited labels, certainty and future predictions are documented and regression-tested where technical |
| 34 | Development/speech safety route | DONE | Speech delay, loss of skills and similar concerns are blocked before history/analytics; the local response gives a referral route plus dated Rijksoverheid/Thuisarts evidence links |
| 35 | Founder Pack | DONE | Product Vision, Content & Astrology Framework, Child Safety & AI Rules and MVP Specification are versioned with the code |
| 36 | Accessibility and keyboard operation | DONE | Native navigation/action buttons, visible focus, modal/menu focus traps, Escape close and reduced-motion support |
| 37 | Public discovery and security contact | DONE | Description/OG metadata, `robots.txt`, `sitemap.xml` and `.well-known/security.txt` |
| 38 | Strict script policy and offline reliability | DONE | Inline script execution removed; expanded resilient offline shell; the city dataset is generated during the build and all user searches stay local at runtime |
| 39 | Distinct medical/development/travel/legal/emergency routes | DONE | Classified before chart calculation, history and analytics; blocked prompt text has zero retention |
| 40 | Three-layer sensitive answer | DONE | Each route displays astrological boundary, verified-information boundary and responsible next step |
| 41 | Health disclaimer at decision points | DONE | Visible in child-profile review, Terms and every medical/development safety answer |
| 42 | No astrology-based diagnosis or causal health claim | DONE | Controlled templates plus explicit Mercury/ADHD safety language; regression-tested |

## Additional deliverables

- DONE: data map, RoPA, LIA draft, DPIA draft, retention/deletion, DSR, vendor register, incident plan, breach template, automated-content policy, Privacy/Cookies/Terms page.
- DONE: 90-day history expiry, explicit Parent Scent transmission checkbox, adult-only 18+ gate with no child-profile access, mobile Methods menu containing all desktop-only sections, CSP/referrer policy and local city dataset attribution.
- DONE: official `childastrologyapp.com` domain declared in the app and legal page; custom-domain JSON migration is available.
- DONE: GA minimisation verified in the production property: Enhanced Measurement, Google Signals, user-provided data and granular location/device collection OFF; event/user retention 2 months; reset on new activity OFF.
- DONE: Founder Pack fixes the product boundary: Child Code is the core journey; Tarot is limited to one Card of the Day (16+), while Parent Scent is adult-only (18+) and never enters or reads the core child profile.
- HUMAN BLOCKER: controller and Dutch privacy counsel must sign the LIA/DPIA and confirm the four questions in `LEGAL_REVIEW_BRIEF.md`.
- HUMAN BLOCKER: complete and retain the Google/GitHub role, DPA and transfer records listed in `VENDOR_REGISTER.md`.

Do not silently add accounts, cloud sync, external AI, photos, payments/subscriptions, advertising or a new remote SDK. Each addition reopens the data map, LIA, DPIA, notices, vendor review and tests.
