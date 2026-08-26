# Data map — current free local version

Version: 26 August 2026

Controller: Ella Kristioglo, Netherlands — ellakristioglo@gmail.com

This map covers only the current GitHub Pages application. It has no account, backend, subscription, payment flow or external AI.

| Data | Subject | Purpose | Storage | Recipient | Retention |
|---|---|---|---|---|---|
| Adult/authority confirmation + time | Parent/user | Prevent unauthorised child profiles | Browser localStorage | None | Until all app data is deleted |
| Child nickname | Child | Identify a profile in the UI | Browser localStorage | None | Until child/all data deletion |
| Birth date and time | Child | Natal calculation | Browser localStorage | None | Until child/all data deletion |
| Birth city, country, timezone | Child | Reproducible calculation and display | Browser localStorage | None | Until child/all data deletion |
| Latitude/longitude | Child | One natal calculation | Memory only | None; local city dataset | Immediate deletion after calculation |
| Natal chart and symbolic interpretation | Child | Requested astrology features | Browser localStorage | None | Until child/all data deletion |
| Notes written by user | Parent and potentially child | Parent observations | Browser localStorage | None | Until note/child/all data deletion |
| Guide question and rule-based answer | Parent and potentially child | Local guidance | Browser localStorage | None | Maximum 90 days or manual deletion |
| Sensitive/restricted question | Parent and potentially child | Safety interception | Not stored | None | Zero |
| Family Scent result and participant nicknames | Users/children entered | Restore result | Browser localStorage | None | Maximum 90 days or manual deletion |
| Order name, contact and scent summary | Adult customer | Start a direct candle enquiry | Not stored by app | User-chosen WhatsApp/email and Ella | Determined outside the app after contact |
| Language and analytics consent | User/device | Preferences and consent control | Browser localStorage | None | Until changed/all data deletion |
| Allow-listed analytics event, language, broad category | User/device | Product usage measurement | Local aggregate; Google only after consent | Google Analytics | GA cookie maximum 180 days; property retention per configured GA controls |
| IP/security request metadata | Visitor | Hosting/security | GitHub infrastructure | GitHub | Per GitHub policy |

## Prohibited data flows

- No child name, birth details, coordinates, chart data, note text or question text in analytics.
- No prompt or profile is sent to an LLM.
- No advertising profiles, pixels or child-trait audiences.
- No persistent coordinates.
- No automatic attachment of child data to WhatsApp/email.

## Data flow

1. The user selects a city from the same-origin bundled GeoNames dataset.
2. Coordinates are used in memory by Astronomy Engine.
3. The chart, city/country and timezone are saved locally; coordinates are removed before persistence.
4. All personalised features use the saved local chart.
5. Optional analytics loads only after consent and receives allow-listed non-content events.
