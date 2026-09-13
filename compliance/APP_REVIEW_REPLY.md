# Reply to Apple — Guideline 2.1, Information Needed

Submission ID: **c5a95203-1cd9-419d-8a1f-9ccd3a884fd5** · App: Child Astrology · Version 1.0 for iOS

Paste the block below into **App Store Connect → App Review → (this submission) → Reply/Send message**, attach the screen recording, and also paste items 2–6 into **App Information → App Review Information → Notes** for future submissions.

---

Hello,

Thank you for the review. The requested information follows. Items 2–6 should also be added to the App Review Information Notes field. Before sending, replace the bracketed sign-in details below with a real reviewer inbox that receives Supabase OTP messages and confirm the current build number.

**1. Screen recording**
A screen recording captured on a physical iPhone running the current iOS, with the current TestFlight build installed, is attached. In order it shows: launching the app; the one‑time adult gate (confirm "I am 18+", accept the Terms, choose Allow/Don't allow for optional analytics); e‑mail sign‑in using the reviewer inbox and the 6‑digit code delivered by Supabase; the Home screen; creating a child profile (parental‑authority confirmation, then nickname, birth date, birth time, birth‑place search, Save) and the resulting symbolic natal chart; the Tarot "card of the day" and the adults‑only "Parent Scent" feature; and finally Settings › Privacy › "Delete account and data", which deletes the sign‑in account on the server and erases all local data, returning the app to the sign‑in screen. The app has no user‑generated content shared between users and no paid content or in‑app purchases.

**2. Purpose and target audience**
Child Astrology is a private reflection tool for adult parents and legal guardians. It helps a parent think about a child's temperament, emotions, communication style and learning style through the symbolic language of astrology, alongside a fixed 6‑step observation method and practical, non‑clinical tips. It is explicitly not a diagnostic, medical, psychological, educational, legal or predictive service, and the app states this during onboarding, in the Terms and in every generated text. The problem it addresses: parents want a calm, structured, low‑screen way to observe and support their child; the value is one private place for a child profile, symbolic insights and the parent's own notes, with strong data minimisation.

**3. Setup and access instructions**
- Launch the app. Complete the one‑time gate: tick "I am 18+", tick "I accept the Terms", choose "Allow" or "Don't allow" for optional analytics, tap "Open app".
- Sign in: enter `[REVIEWER INBOX]`, tap Continue, retrieve the Supabase message from `[INBOX ACCESS INSTRUCTIONS]`, enter the delivered 6-digit code and tap Confirm. The app has no fixed or client-side review code.
- On Home tap "Add a child". Confirm the parental‑authority statement. Enter any nickname, a birth date, a birth time (or tick "time unknown"), then type at least 3 letters of a city (e.g. "Rotterdam") and pick a result. Tap Save. The symbolic natal chart is generated on device.
- All other sections (Tarot, Parent Scent, Method, Sport, School, 10 tips, Consultations, Settings) are on the bottom navigation.
- Account/data deletion: Settings › Privacy › "Delete account and data". "Sign out" behaviour is included in the same action.

**4. External services used for core functionality**
- Supabase (Supabase, Inc.) — e‑mail one‑time‑code authentication only. It receives the user's e‑mail address and issues a session token. No child data, birth data, notes or chart data is ever sent to Supabase. A Supabase Edge Function is also used solely to delete the user's own account when they choose "Delete account and data". Reviewer access uses the same real OTP flow as every other account.
- GeoNames "cities15000" dataset — a static list bundled inside the app for the birth‑place picker. Search runs on device; no birth‑place query is sent to any remote geocoder. Redistributed under the Creative Commons Attribution licence (attributed in the app and Privacy Policy).
- Google Analytics 4 (Google Ireland Limited) — optional, OFF by default, consent‑gated in the one‑time gate and in Settings. When enabled it receives only a small allow‑list of technical events, the UI language and broad action categories — never names, birth data, coordinates, the chart, notes or question text.
- Astronomical positions are computed on device with the open‑source "astronomy‑engine" library. There is no generative or external AI. The in‑app parent Q&A is deterministic on‑device rule logic that blocks sensitive topics and links to official sources instead of giving advice.
- Outbound links (WhatsApp contact, official‑source references, Privacy Policy) open the system browser only after a deliberate tap. "Consultation" and "Parent Scent order" open a pre‑filled WhatsApp or e‑mail message to the developer; nothing is sold or paid for inside the app.

**5. Regional differences**
The app functions identically in every region. The only differences are language (Dutch by default, plus Russian, Ukrainian and English, switchable in‑app) and the localised country name shown for a selected city. There is no region‑locked content, no region‑specific pricing (the app is free) and no feature unavailable in any country.

**6. Regulated industry / third‑party material**
The app is not part of a regulated industry. Astrology and Tarot are presented only as tools for personal reflection, with repeated in‑app disclaimers that they are not medical, psychological, educational, legal or financial assessment and must not be the basis for decisions about a child's health, treatment, schooling, safety or future. The only third‑party material is the GeoNames city dataset, redistributed under its Creative Commons Attribution licence and attributed in the app's third‑party notices and Privacy Policy. "Parent Scent" is an adults‑only symbolic fragrance suggestion for parents; it is self‑attested 18+, contains no mature content, and never reads child profiles or child data.

Please let me know if anything else is needed.
Kind regards,
Ella Kristioglo
