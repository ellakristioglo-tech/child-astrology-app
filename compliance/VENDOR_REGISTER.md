# Vendor and transfer register

Version: 13 September 2026

| Vendor/component | Function | Data | Runtime role/transfer | Contract/status |
|---|---|---|---|---|
| GitHub Pages / GitHub | Static hosting for `childastrologyapp.com` and service security | Visitor IP/request metadata; no app localStorage | GitHub infrastructure; locations per GitHub terms | Custom domain configured; terms/privacy reviewed; document final role and DPA need before official launch |
| Google Analytics 4 / Google Ireland Limited | Optional product analytics | Allow-listed event, language, broad category and limited Google technical data; no child name, birth data, question text or derived profile | Only after consent; transfers per applicable Google mechanism | Measurement ID `G-SZHFB9KVM4`; Enhanced Measurement, Google Signals, user-provided data and granular location/device collection OFF; event and user retention 2 months; reset on new activity OFF; DPA/data-processing terms and transfer record require controller sign-off |
| GeoNames dataset | Bundled city names, coordinates and timezone | No user query leaves device | Dataset only, no runtime processor | CC BY 4.0 attribution included; refresh/version periodically |
| Astronomy Engine | Local ephemeris calculation | Birth inputs in device memory | Bundled local code; no network | MIT licence bundled |
| WhatsApp / Meta | User-selected direct enquiry | Adult name/contact and scent summary | Independent user-initiated channel; no automatic child birth data | User chooses; provider terms apply |
| User email provider/client | User-selected direct enquiry | Adult name/contact and scent summary | Independent user-initiated channel | User chooses; provider terms apply |
| Supabase (Supabase Inc.) | Parent sign-in by e-mail one-time code and authenticated self-service account deletion (`auth-gate.js`, `delete-user`) | Parent e-mail address, user ID, auth session/token and authentication/security metadata only; **no child name, birth data, question text or derived profile** | Active production processor at project `hcxwzsvicihnkmlrsftv`; `signInWithOtp` / `verifyOtp` sends and verifies OTP e-mail. The Edge Function uses the service-role key only server-side to delete the calling user | **Active; human evidence incomplete:** verify EU project region, accept/retain Supabase DPA, record transfer mechanism and sub-processors, set auth/log/backup retention and rate limits, restrict administrator access with MFA, and confirm `delete-user` is deployed |

## Not present in this version

No payment provider, subscription platform, OpenAI/LLM, advertising network, push provider or support-ticket system. Authentication uses Supabase (row above); the only server-side personal data is the parent e-mail address — child profile data stays in local storage.

## Launch evidence still requiring human completion

- Record exact legal entity/role for GitHub and Google.
- Accept/retain current Google data-processing terms and record transfer mechanism.
- Reconfirm the recorded GA minimisation settings after every property or stream change: consent gate, Enhanced Measurement OFF, Google Signals OFF, user-provided data OFF, granular location/device collection OFF, event/user retention 2 months and reset on new activity OFF.
- Supabase: verify the configured region, sign/retain the DPA, record the transfer mechanism/sub-processors, document auth/log/backup retention and rate limits, enforce administrator MFA/least privilege, and verify the `delete-user` Edge Function on production and TestFlight.
- Reassess every vendor before adding a new SDK or remote API.
