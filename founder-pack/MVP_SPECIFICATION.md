# MVP Specification

Version: 28 August 2026

## Launch product

Free, parent-directed, local-first web/PWA for the Netherlands and EU. No account, cloud database, payment, subscription or external AI.

## Core journey

1. Explore general information without entering child data.
2. Choose to add a child.
3. Confirm 18+ and legal authority for that child.
4. Read the child-data notice.
5. Enter nickname, date, optional exact time and birthplace.
6. Calculate the chart locally.
7. Read the eight core Child Code outcomes.
8. Ask an ordinary parent question through the on-device safety router.
9. Export, import or delete local data at any time.

## P0 scope

- Adult/parent positioning and per-child authority confirmation.
- Local birth-profile and astrology calculation.
- Unknown-birth-time handling.
- Eight core Child Code outcomes.
- Practical, non-diagnostic recommendations.
- Deterministic local parent Q&A.
- Pre-answer safety routing for development, medical, travel, legal, restricted inference and emergency questions.
- Three visibly separated safety layers: astrological boundary, verified information and responsible next step.
- Dated official-source and referral cards for development/health safety routes; links open only after a deliberate user click.
- Privacy dashboard: export/import/readable copy/delete history/delete child/delete all.
- Four languages: NL, RU, UA, EN.
- Consent-gated, allow-listed GA4 events without child content.
- Installable and offline-capable PWA.

## Optional separated modules in this release

- Tarot contains only one Card of the Day, with a 16+ gate and no questions, multi-card spreads, diagnosis or fate claims.
- Parent Scent is restricted to adult parents/partners (18+), never reads child profiles, calculates locally and contacts Ella only after deliberate user action.

They do not block the core journey and are reassessed independently before monetisation.

## Explicitly not in this MVP

- Child login or child-directed account.
- Parent registration or email verification.
- Cloud child profiles or cross-device sync.
- External generative AI.
- Medical/developmental screening or health score.
- Travel concierge or booking changes.
- Specialist marketplace.
- Subscription, payment or advertising profiles.

## Data minimisation

Required for personal calculation: nickname, birth date, birthplace; exact time only when known. Coordinates are used transiently and removed before persistence. Do not collect school, address, photos, documents or structured medical data.

## Acceptance criteria

- Google scripts do not load before explicit analytics permission.
- Sensitive question text is blocked before storage and analytics.
- Blocked safety answers never use a chart and display all three safety layers.
- All navigation and primary controls work with keyboard and visible focus.
- Modal focus is contained; Escape closes; focus returns to the invoking control.
- Unknown birth time produces no fabricated houses or Ascendant.
- Delete Child cascades to notes and that child’s history.
- Delete all removes only Child Astrology keys and its analytics cookies.
- JSON import never imports analytics consent or general adult confirmation.
- Core functions work at mobile widths and after PWA update.
- Legal, privacy, retention, incident and vendor records match the implemented version.

## Later gates

Accounts, cloud storage, external AI, payments, automated Parent Scent sales or specialist partnerships require a new data map, DPIA/vendor review, updated Terms/Privacy and security testing before development is enabled.
