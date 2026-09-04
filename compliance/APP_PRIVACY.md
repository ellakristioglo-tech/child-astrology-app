# App Store Connect — App Privacy answers

Version: 4 September 2026
Controller: Ella Kristioglo, Netherlands — ellakristioglo@gmail.com
Covers: `com.childastrology.app` (Capacitor wrapper around the childastrologyapp.com PWA)

This is a ready-to-enter answer sheet for **App Store Connect → your app →
App Privacy**. Derived from the code in this repo, the CSP (`connect-src`),
`analytics.js`, the Supabase e-mail sign-in (`auth-gate.js`) and
`compliance/DATA_MAP.md`.

---

## 1. The one thing to understand first

Apple's "App Privacy" only asks about data that **leaves the device**.

Almost everything this app handles — child nickname, birth date / time /
place, the natal chart and interpretation, notes, the rule-based guide
Q&A, tarot draws, Parent Scent results — is stored **only in the browser's
local storage on the user's device and is never transmitted anywhere**.
None of it is declared in App Privacy. (It still must be described in the
written Privacy Policy — see §5.)

Only **three** things actually go off the device:

| What | To whom | When |
|---|---|---|
| Parent's **e-mail address** + the Supabase **user id / session** | Supabase (auth processor) | On sign-in (one-time code / magic link) |
| Coarse **product-analytics events** + a Google Analytics client id | Google Analytics 4 (`G-SZHFB9KVM4`) | Only after the user explicitly opts in on the consent screen |
| Request **IP address** | GitHub Pages (hosting), Supabase, Google — inherently | Every network request; used for delivery/security, `anonymize_ip: true` on GA |

The app sends **no** prompt, profile, birth data, note text or question
text to any server or LLM (the "AI" guide is local rule-based logic; CSP
blocks every host except `*.supabase.co` and Google Analytics).

---

## 2. App Store Connect — click-path answers

**"Do you or your third-party partners collect data from this app?"** → **Yes**

Then declare exactly the following data types. Everything not listed here:
**"Data Not Collected"**.

### Contact Info → Email Address
- Collected: **Yes**
- Linked to the user's identity: **Yes** (it is the account identifier)
- Used for tracking: **No**
- Purposes: **App Functionality** (passwordless sign-in / account)

### Identifiers → User ID
- Collected: **Yes** (Supabase assigns a user UUID at sign-in)
- Linked to the user's identity: **Yes**
- Used for tracking: **No**
- Purposes: **App Functionality**

### Identifiers → Device ID
- Collected: **Yes** (Google Analytics client id — a random per-browser id; only set after analytics consent)
- Linked to the user's identity: **No** (never joined to the e-mail / account; resets when the user clears site data)
- Used for tracking: **No**
- Purposes: **Analytics**

### Usage Data → Product Interaction
- Collected: **Yes** (allow-listed events only: `app_open`, `section_view`, `child_profile_created`, `child_analysis_generated`, `consultation_question`, `tarot_day_card`, `tarot_five_card`, `scent_generated`, `scent_order_started`; parameters limited to `section`, `topic`, `language`, `mode`, `source`, ≤ 40 chars; no names, birth data, coordinates, note or question text). Only after analytics consent.
- Linked to the user's identity: **No**
- Used for tracking: **No**
- Purposes: **Analytics**

### Tracking section
**"Do you use data for tracking?"** → **No**

Justification (keep for your records, not entered): Google Analytics runs
with `allow_google_signals: false`, `ad_storage: denied`,
`ad_user_data: denied`, `ad_personalization: denied`, `anonymize_ip: true`,
consent-gated; no advertising SDKs, no data brokers, no cross-app or
cross-site linking for advertising. Therefore no ATT prompt is required.

---

## 3. Judgment calls (decide, then keep a note of the choice)

| Item | Recommended answer | Why / alternative |
|---|---|---|
| **Location → Coarse Location** (Google/Supabase can derive approximate location from IP) | **Do not declare** | GA has `anonymize_ip: true` and the app makes no use of location. If you prefer maximum caution, declare *Coarse Location → Analytics → Not linked → not for tracking*. |
| **Diagnostics → Other Diagnostic Data** (Supabase keeps short-lived auth logs with IP + user-agent for sign-in security) | **Do not declare** | Apple permits omitting data used solely for security / fraud prevention and not retained long-term. Alternative: declare *Other Diagnostic Data → App Functionality → Linked → not for tracking*. |
| **Device ID / Usage Data "Linked"** | **Not linked** (as above) | Accurate: the e-mail is never sent to GA and there is no server-side join. Over-declaring as "Linked" is also safe with Apple if you want to be conservative. |

Whatever you choose, it must match the Privacy Policy wording.

---

## 4. Third-party partners to name (if App Store Connect asks)

- **Google LLC** — Google Analytics 4 (product analytics, consent-gated).
- **Supabase, Inc.** — authentication (parent e-mail, user id, session).

---

## 5. Privacy Policy alignment checklist (`legal.js` / `legal.html`)

The written policy must now also say — before submission — that:

- [ ] Sign-in uses the parent's **e-mail address**, processed by **Supabase**
      (name the sub-processor / region), stored server-side; purpose =
      authentication; retention = until the account is deleted.
- [ ] A **Supabase user id** and session token are created for the account.
- [ ] Everything else (child profile, birth data, chart, notes, Q&A,
      tarot, Parent Scent) stays **on the device** and is never uploaded.
- [ ] **Google Analytics** is optional, off by default, and only collects
      the allow-listed non-content events listed in §2.
- [ ] The app is **for adults / parents and legal guardians**; a child
      does not use it directly (see §6).
- [ ] How to **delete the account and all data** (Settings → "Clear all"
      wipes local data; deleting the Supabase account removes the e-mail —
      provide the request route, e.g. the contact e-mail, until in-app
      account deletion exists).
- [ ] **Health disclaimer**: the app gives no medical advice and does not
      collect health data (`HEALTH_NOTICE` in `legal.js`).
- [ ] Contact for privacy requests: `ellakristioglo@gmail.com`.

## 6. Kids-category / age note

- Do **not** publish in the Apple "Kids" category — the app is designed for
  a parent, not for a child user.
- Age Rating: the content is symbolic astrology with no objectionable
  material; expected **4+**, but complete the Age Rating questionnaire
  honestly (no user-generated content shared publicly, no unrestricted web).
- App Review note (see App Review Information step) should state plainly:
  *"Child Astrology is a tool for adult parents. The adult signs in with
  their own e-mail; child data (a nickname and birth details) is entered by
  the parent and stays on the device."*

## 7. Repo docs to update to match

`compliance/DATA_MAP.md`, `ROPA.md`, `LIA.md`, `DPIA.md` still say
"no account, backend or external AI". Add the Supabase e-mail sign-in row
(processor, EU region, DPA, retention, DSR path) — same follow-ups already
listed in `compliance/VENDOR_REGISTER.md`.
