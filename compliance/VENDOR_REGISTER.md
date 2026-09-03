# Vendor and transfer register

Version: 27 August 2026

| Vendor/component | Function | Data | Runtime role/transfer | Contract/status |
|---|---|---|---|---|
| GitHub Pages / GitHub | Static hosting for `childastrologyapp.com` and service security | Visitor IP/request metadata; no app localStorage | GitHub infrastructure; locations per GitHub terms | Custom domain configured; terms/privacy reviewed; document final role and DPA need before official launch |
| Google Analytics 4 / Google Ireland Limited | Optional product analytics | Allow-listed event, language, broad category and limited Google technical data; no child name, birth data, question text or derived profile | Only after consent; transfers per applicable Google mechanism | Measurement ID `G-SZHFB9KVM4`; Enhanced Measurement, Google Signals, user-provided data and granular location/device collection OFF; event and user retention 2 months; reset on new activity OFF; DPA/data-processing terms and transfer record require controller sign-off |
| GeoNames dataset | Bundled city names, coordinates and timezone | No user query leaves device | Dataset only, no runtime processor | CC BY 4.0 attribution included; refresh/version periodically |
| Astronomy Engine | Local ephemeris calculation | Birth inputs in device memory | Bundled local code; no network | MIT licence bundled |
| WhatsApp / Meta | User-selected direct enquiry | Adult name/contact and scent summary | Independent user-initiated channel; no automatic child birth data | User chooses; provider terms apply |
| User email provider/client | User-selected direct enquiry | Adult name/contact and scent summary | Independent user-initiated channel | User chooses; provider terms apply |
| Supabase (Supabase Inc.) | Parent sign-in by e-mail one-time code (`auth-gate.js`) | Parent e-mail address and auth session/token only; **no child name, birth data, question text or derived profile** | Runtime processor: `signInWithOtp` / `verifyOtp` calls to `https://<project>.supabase.co`; sends the OTP e-mail. Project region and sub-processors per Supabase configuration | **Requires human completion before launch:** choose EU project region, accept Supabase DPA, record transfer mechanism, set auth/user retention, decide account-deletion (DSR) path, add to privacy notice. Disabled until `SUPABASE_URL` / `SUPABASE_ANON_KEY` are set |

## Not present in this version

No payment provider, subscription platform, OpenAI/LLM, advertising network, push provider or support-ticket system. Authentication uses Supabase (row above); the only server-side personal data is the parent e-mail address — child profile data stays in local storage.

## Launch evidence still requiring human completion

- Record exact legal entity/role for GitHub and Google.
- Accept/retain current Google data-processing terms and record transfer mechanism.
- Reconfirm the recorded GA minimisation settings after every property or stream change: consent gate, Enhanced Measurement OFF, Google Signals OFF, user-provided data OFF, granular location/device collection OFF, event/user retention 2 months and reset on new activity OFF.
- Supabase: select EU region, sign/retain the Supabase DPA, record the transfer mechanism, define auth-data retention and the account-deletion (DSR) procedure, and reflect Supabase in DATA_MAP, ROPA, DPIA/LIA and the privacy notice before enabling it in production.
- Reassess every vendor before adding a new SDK or remote API.
