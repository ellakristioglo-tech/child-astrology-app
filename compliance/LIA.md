# Legitimate Interests Assessment — draft

Version: 26 August 2026

Status: engineering/privacy draft. Dutch privacy-lawyer approval required before treating this as final.

## Processing assessed

Local-on-device creation of a child profile, natal calculation and astrology-inspired interpretation requested by an adult parent/legal representative. There is no account, backend, external AI or operator access to the personalised data.

## 1. Purpose test

The interest is to provide the requested free, privacy-preserving reflective astrology tool. The purpose is specific and lawful on its face. The product must remain informational and must not diagnose, make significant decisions, or market using child traits.

## 2. Necessity test

- Nickname, birth date, time, place/timezone and derived chart are needed for the claimed personalised calculation.
- Legal name, photo, school, address, parent email and device advertising ID are not needed and are not collected.
- Coordinates are needed only during calculation and are deleted immediately.
- A bundled city dataset avoids sending the birth-place query to a geocoding vendor.
- Question history is optional/user-deletable and expires after 90 days. Sensitive question text has zero retention.

Less intrusive alternatives were considered. A non-personalised generic guide would not provide the selected feature. Local processing and strict minimisation are the least intrusive viable design for this version.

## 3. Balancing test

Risks are higher because the data subject is a child and the derived content can be perceived as personality profiling. Reasonable expectations are improved by the parent-authority gate, layered notice, local-only architecture and prominent reflective-use limitations. The operator cannot browse local profile data.

Safeguards:

- adult/legal-authority declaration and nickname guidance;
- no photo, account, cloud database or external AI;
- local city search and transient coordinates;
- sensitive-category blocking and no diagnosis;
- no Article 22 significant decisions;
- child deletion cascade, all-data deletion and two export formats;
- 90-day history expiry;
- consent gate for optional analytics;
- direct request route for a child aged 16+ in the Netherlands.

Residual concern: an adult may over-rely on astrology or lack authority. This is reduced, not eliminated, by positioning, warnings, a dispute procedure and deletion controls.

## Provisional outcome

The interest appears capable of being balanced for this strictly local version, subject to Dutch counsel confirming Article 6(1)(f), especially for children aged 16–17. If the product adds cloud sync, accounts, external AI, photos, subscriptions or advertising, this LIA must be reopened before release.

## Approval

- Privacy owner: __________________ / date: __________
- Dutch privacy counsel: __________ / date: __________
- Conditions/findings: __________________________________________
