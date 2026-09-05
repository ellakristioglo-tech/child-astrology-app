# App Store Connect — listing, age rating, pricing, review notes

Version: 4 September 2026
App: Child Astrology · `com.childastrology.app` · author Ella Kristioglo
Prepared as a draft to paste into App Store Connect. Review every field
against the final TestFlight build before submitting.

> Note: the founder-pack still says "no account / no email verification".
> The shipped app now has passwordless **e-mail sign-in** (Supabase). The
> copy and answers below describe the app **as shipped**.

---

## 1. App information (static)

| Field | Value |
|---|---|
| Name | `Child Astrology` |
| Bundle ID | `com.childastrology.app` |
| Primary language | English (UK) *(or Dutch — see §2 for both)* |
| Primary category | **Lifestyle** |
| Secondary category | **Reference** |
| Made for Kids | **No** — do not enable. The app is for adult parents/guardians. |
| Content rights | Does not contain, show, or access third-party content |
| Age Rating | see §4 |

Support URL: `https://childastrologyapp.com/`
Marketing URL (optional): `https://childastrologyapp.com/`
Privacy Policy URL: `https://childastrologyapp.com/legal.html?doc=privacy`

---

## 2. Localised listing copy

### English (primary)

**Subtitle** (≤ 30): `Understand your child deeper`

**Promotional text** (≤ 170):
`A caring, non-diagnostic astrology guide for parents. Character, emotions, communication and learning — with practical, gentle suggestions. No predictions.`

**Keywords** (≤ 100, comma-separated, no spaces):
`parenting,child,astrology,natal chart,zodiac,emotions,character,birth chart,family,parent guide,tarot`

**Description** (≤ 4000):
```
Child Astrology is a calm, screen-light tool for adult parents and legal
guardians who want to understand their child's individuality a little
better — and choose one concrete, gentle way to support them today.

Astrology is used here as a symbolic language for observation and
self-reflection. It is not medical, psychological, speech or educational
assessment, and it makes no predictions about who your child will become.

WHAT YOU CAN DO
• Create a private child profile (a nickname and birth details) and see a
  locally calculated natal chart.
• Read the Child Code: character, emotions, communication style, learning
  style and where your child may need support.
• Follow the 6-step method: observe, connect, reflect, understand,
  support, evaluate.
• Get practical, non-diagnostic ideas for sports (by Mars), learning
  (by Mercury) and everyday situations.
• Ask an ordinary parenting question and get a deterministic, on-device
  answer, with a clear boundary when a real specialist is the right next
  step.
• Optional, clearly separated extras: one Tarot Card of the Day for
  reflection, and Parent Scent — an adults-only symbolic fragrance idea
  that never reads your child's data.

PRIVACY BY DESIGN
• Your child's profile, birth details, chart, notes and questions stay
  on your device. They are never uploaded.
• Sign-in uses only your e-mail address and a one-time code.
• Optional analytics is off by default and never receives names, birth
  data or question text.
• Export, import or delete all your data at any time in Settings.

FOR ADULTS
Child Astrology is designed for a parent, not for a child. You confirm you
are 18+ and legally entitled to add each child's details.

Child Astrology does not replace professional advice. If you are worried
about your child's development, health, speech or behaviour, please
contact a qualified professional.
```

### Dutch (nl) localisation

**Subtitle**: `Begrijp je kind dieper`

**Promotional text**:
`Een zorgvuldige, niet-diagnostische astrologische gids voor ouders. Karakter, emoties, communicatie en leren — met concrete, milde suggesties. Geen voorspellingen.`

**Keywords**:
`opvoeding,kind,astrologie,geboortehoroscoop,horoscoop,emoties,karakter,gezin,oudergids,tarot,sterrenbeeld`

**Description**: translate the English block, keeping the same structure
and the "voor volwassen ouders / geen voorspellingen / gegevens blijven op
je apparaat / vervangt geen professioneel advies" phrasing already used in
`legal.js` and the in-app consent screen.

*(RU / UA store localisations are optional; the app UI already covers those
languages. Only add store localisations you can proofread.)*

---

## 3. Screenshots (item 6 — do after TestFlight)

- Required: 6.9" iPhone (1320 × 2868) and 6.5" iPhone (1242 × 2688). One
  set can be scaled for the rest.
- 4–6 frames from the **final** build, in the current dark celestial
  style: (1) sign-in screen, (2) child profile / natal chart,
  (3) Child Code outcome, (4) 6-step method, (5) parent question with the
  safety boundary, (6) privacy dashboard.
- No device frames with a fake status bar; use real screenshots.
- Add a short caption strip per frame in the same visual style.

---

## 4. Age Rating questionnaire (item 9)

Answer honestly; expected result **4+** (at most 9+).

- Cartoon/Fantasy Violence, Realistic Violence, Sexual Content, Nudity,
  Profanity, Alcohol/Tobacco/Drugs, Horror/Fear, Mature/Suggestive: **None**
- **Simulated Gambling: None** (the Tarot card is a single reflection
  card, no wager, no stakes, no multi-card spreads).
- Medical/Treatment Information: **None** (explicitly non-diagnostic; the
  app routes medical questions to official sources instead of answering).
- Unrestricted Web Access: **No** (external links open the system browser
  only after a deliberate tap; there is no in-app browser).
- Made for Kids: **No**.
- Data collection for advertising / tracking: **No**.

If the questionnaire asks about "fortune telling / horoscopes": describe
it as symbolic reflection with no predictions or fate claims (matches the
in-app text and `founder-pack/CONTENT_ASTROLOGY_FRAMEWORK.md`).

---

## 5. Pricing and availability (item 10)

- Price: **Free** (Tier 0). No in-app purchases.
- Tax category: standard digital app category (default).
- Availability: **Netherlands + EU/EEA first** — the compliance pack
  (GDPR, DPIA, ROPA, retention) is written for the EU. Expand to more
  territories in a later version once reviewed for those markets.
- Pre-orders: no. Release: **Manually release this version** after
  approval, so you control the go-live moment.

---

## 6. App Review Information (item 11)

**Contact**: Ella Kristioglo · `ellakristioglo@gmail.com` · [phone].

**Sign-in required**: Yes — passwordless e-mail one-time code.

**Demo account / how the reviewer signs in** — pick ONE and fill it in:

- **Preferred:** add a test OTP in Supabase → Authentication (Email
  provider settings → "Test OTP" / test accounts): e.g.
  `review@childastrologyapp.com` → `424242`. Then in Review Notes:
  *"Sign in with review@childastrologyapp.com. When asked for the
  6-digit code, enter 424242 (test code, no e-mail is sent)."*
- Fallback if that setting is unavailable: create a real inbox you
  control for reviewers and put its address + how to retrieve the code
  in the notes, or state that you will provide a fresh code within
  minutes on request via Resolution Center.

**Review Notes** (paste, then adjust):
```
Child Astrology is a tool FOR ADULT PARENTS AND LEGAL GUARDIANS. A child
does not use or sign into the app.

- Sign-in is passwordless: the parent enters their own e-mail and a
  6-digit one-time code. Test access: <see demo account above>.
- After sign-in, the parent may add a child profile (a nickname and
  birth date/place). All child data, the natal chart, notes and the
  Q&A history are stored ONLY on the device (browser local storage) and
  are never uploaded.
- Astrology is used as a symbolic language for reflection. The app makes
  no predictions and no medical, psychological, speech or educational
  diagnosis. Parenting questions about development, health, travel or
  legal matters are intercepted and answered with links to official
  sources, not with advice.
- There is no external/generative AI. The parent Q&A is deterministic
  on-device logic.
- External links (WhatsApp contact, official-source references, the
  Privacy Policy) open the system browser only after a deliberate tap.
- Optional analytics (Google Analytics) is OFF by default and never
  receives names, birth data or question text.
- Full data export / import / delete is in Settings. GDPR/DPIA/ROPA
  documentation is maintained by the developer and available on request.

Languages: Dutch (default), Russian, Ukrainian, English.
```

**Attachment (optional but helps):** a short PDF or note pointing to the
in-app 18+/authority confirmation flow and the Privacy dashboard.

---

## 7. Final pre-submit checklist (item 13)

Run on the **TestFlight** build, on a real iPhone, in each of NL/EN/RU:

- [ ] App launches; no blank screens, no `#` links, no lorem/test text.
- [ ] Consent gate: 18+ + terms + analytics choice all required; "Open
      the app" only enables when complete.
- [ ] E-mail sign-in: code arrives, wrong code shows an error, correct
      code enters the app; reopening the app keeps you signed in.
- [ ] "Change e-mail" / back on the code screen works.
- [ ] Add child → natal chart renders; unknown birth time handled.
- [ ] Child Code outcomes populate; no Cyrillic leaking into EN/NL.
- [ ] Parent question: normal question answered on-device; a medical /
      development question is intercepted with official-source cards.
- [ ] Tarot: only Card of the Day; 16+ gate; no spreads.
- [ ] Parent Scent: 18+ gate; never lists child profiles.
- [ ] Language switch RU/UA/EN/NL updates every visible string.
- [ ] Privacy dashboard: export, readable export, delete history,
      delete child, **delete all** — each works; "delete all" wipes
      local data and returns to the consent gate.
- [ ] Privacy Policy link opens and matches the App Privacy answers
      (`compliance/APP_PRIVACY.md`).
- [ ] Rotate device / reopen after force-quit: state is sane.
- [ ] No crash, no console errors on the main flows.

When all boxes pass: **Add build → Add for Review → Submit for Review**.
