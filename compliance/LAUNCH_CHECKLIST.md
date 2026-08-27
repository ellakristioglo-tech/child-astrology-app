# Launch checklist — current free local version

Version: 26 August 2026

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
| 21 | Export Data | DONE | JSON + readable HTML |
| 22 | Backup deletion lifecycle | N/A | No application backend/backups; local-only disclosure |
| 23 | Cookie consent before optional trackers | DONE | GA script created only after consent; accept/reject/settings |
| 24 | Subscription cancellation | N/A | No subscription or paywall |
| 25 | Statutory online withdrawal | N/A | No online contract/purchase; candle is direct enquiry |
| 26 | Admin MFA/RBAC | N/A | No admin panel/backend |
| 27 | Secret manager | N/A | No frontend secrets/API keys |
| 28 | Security/audit logging | N/A for app backend | No backend; GitHub handles hosting security logs |
| 29 | Rate limiting/account takeover protection | N/A | No auth/API/account |
| 30 | Automated privacy/security tests | DONE | Node regression tests run before Pages deployment |

## Additional deliverables

- DONE: data map, RoPA, LIA draft, DPIA draft, retention/deletion, DSR, vendor register, incident plan, breach template, automated-content policy, Privacy/Cookies/Terms page.
- DONE: 90-day history expiry, explicit Family Scent transmission checkbox, mobile Methods menu containing all desktop-only sections, CSP/referrer policy and local city dataset attribution.
- HUMAN BLOCKER: controller and Dutch privacy counsel must sign the LIA/DPIA and confirm the four questions in `LEGAL_REVIEW_BRIEF.md`.
- HUMAN BLOCKER: complete and retain the Google/GitHub role, DPA and transfer records listed in `VENDOR_REGISTER.md`.

Do not silently add accounts, cloud sync, external AI, photos, payments/subscriptions, advertising or a new remote SDK. Each addition reopens the data map, LIA, DPIA, notices, vendor review and tests.
