# Data map — current free local-first version

Version: 13 September 2026

Controller: Ella Kristioglo, Netherlands — ellakristioglo@gmail.com

This map covers the current GitHub Pages application and its Supabase parent sign-in. It has no cloud child profiles, subscription, payment flow or external AI.

| Data | Subject | Purpose | Storage | Recipient | Retention |
|---|---|---|---|---|---|
| Parent e-mail address and Supabase user ID | Parent/user | Passwordless account creation and sign-in | Supabase Auth | Supabase | Until account deletion; vendor retention settings require controller verification |
| Auth session/access and refresh tokens | Parent/user/device | Keep the parent signed in and authorise own-account deletion | Browser localStorage and Supabase Auth | Supabase | Session lifetime/configuration; cleared locally after confirmed account deletion or sign-out |
| Adult confirmation + time | Parent/user | Adult-directed eligibility | Browser localStorage | None | Until all app data is deleted |
| Child-specific authority confirmation + time/version | Parent + child context | Accountability for each child profile | Inside that local child profile | None | Deleted with that child profile |
| Child nickname | Child | Identify a profile in the UI | Browser localStorage | None | Until child/all data deletion |
| Birth date and time | Child | Natal calculation | Browser localStorage | None | Until child/all data deletion |
| Birth city, country, timezone | Child | Reproducible calculation and display | Browser localStorage | None | Until child/all data deletion |
| Latitude/longitude | Child | One natal calculation | Memory only | None; local city dataset | Immediate deletion after calculation |
| Natal chart and symbolic interpretation | Child | Requested astrology features | Browser localStorage | None | Until child/all data deletion |
| Notes written by user | Parent and potentially child | Parent observations | Browser localStorage | None | Until note/child/all data deletion |
| Guide question and rule-based answer | Parent and potentially child | Local guidance | Browser localStorage | None | Maximum 90 days or manual deletion |
| Sensitive/restricted question | Parent and potentially child | Safety interception | Not stored | None | Zero |
| Parent Scent result and adult participant names | Adult parent/partner only | Restore adult candle result | Browser localStorage | None | Maximum 90 days or manual deletion |
| Order name, contact and scent summary | Adult customer | Start a direct candle enquiry | Not stored by app | User-chosen WhatsApp/email and Ella | Determined outside the app after contact |
| Language and analytics consent | User/device | Preferences and consent control | Browser localStorage | None | Until changed/all data deletion |
| User-created JSON backup | Parent/user and child profiles included by the user | Device-to-device or old-domain migration | User-selected local file; imported into browser localStorage | None unless the user independently shares the file | Controlled and deleted by the user |
| Allow-listed analytics event, language, broad category | User/device | Product usage measurement | Local aggregate; Google only after consent | Google Analytics | GA cookie maximum 180 days; property retention per configured GA controls |
| IP/security request metadata | Visitor | Hosting/auth security | GitHub and Supabase infrastructure; Google only after analytics consent | GitHub, Supabase and, when consented, Google | Per applicable vendor settings/policies |

## Prohibited data flows

- No child name, birth details, coordinates, chart data, note text or question text in analytics.
- No prompt or profile is sent to an LLM.
- No advertising profiles, pixels or child-trait audiences.
- No persistent coordinates.
- No fixed client-side review code or authentication bypass.
- No automatic attachment of child data to WhatsApp/email.
- Parent Scent never reads child profiles and rejects participant birth dates less than 18 years ago.

## Data flow

1. The adult enters an e-mail address; Supabase sends and verifies a one-time code and stores the account/session data.
2. The user selects a city from the same-origin bundled GeoNames dataset.
3. Coordinates are used in memory by Astronomy Engine.
4. The chart, city/country and timezone are saved locally; coordinates are removed before persistence.
5. All personalised features use the saved local chart and are not uploaded to Supabase.
6. Optional analytics loads only after consent and receives allow-listed non-content events.
7. A JSON backup can restore portable app data, including the child-specific timestamp already stored inside each profile. Analytics consent and the separate general 18+ confirmation are not imported and must be chosen again in the destination origin.
8. Account deletion calls the authenticated `delete-user` Edge Function. Local data is erased only after the server confirms deletion; failure keeps the data and shows an error.
