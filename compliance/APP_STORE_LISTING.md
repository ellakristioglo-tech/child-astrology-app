# App Store Connect — listing, age rating, pricing, review notes

Version: 8 September 2026 — **repositioned for Guideline 4.3(b)**
App: Child Astrology · `com.childastrology.app` · author Ella Kristioglo

> **Why this rewrite:** Apple rejected build 1.0 (19) under Guideline
> 4.3(b) (Design – Spam), calling the app a duplicate of the many
> astrology/horoscope apps already on the store. The copy below leads with
> the **parenting observation method** and the **per-child private
> notebook**, and states plainly what the app is NOT (no horoscope feed,
> no fortune-telling, no palmistry). Pair this with the appeal in
> `APP_REVIEW_APPEAL_43b.md`.

---

## 0. Consider renaming the app (biggest single 4.3(b) risk)

The word **"Astrology" in the app name** is the loudest signal that this
is "another astrology app". Renaming materially improves the odds. The
website/brand can stay `Child Astrology`; the App Store name can differ.

Suggested names (pick one, then it must match the first screenshot's
wordmark and the keywords):

- **Child Compass** · nl **Kindkompas**
- **Understand Your Child**
- **Child Character Notes** · nl **Kindkarakter**
- **Parent Observation Method**

If Ella wants to keep `Child Astrology`, the appeal has to carry more
weight — still doable, lower odds.

---

## 1. App information (static)

| Field | Value |
|---|---|
| Name | `Child Compass` *(recommended)* — or keep `Child Astrology` |
| Bundle ID | `com.childastrology.app` *(unchanged — bundle ID is internal)* |
| Primary language | Dutch *(or English — provide both, see §2)* |
| Primary category | **Education** *(was Lifestyle; Education distances it from the "Lifestyle → astrology" bucket)* |
| Secondary category | **Lifestyle** |
| Made for Kids | **No** — the app is for adult parents/guardians |
| Content rights | Does not contain, show, or access third-party content |
| Age Rating | see §4 |

Support URL: `https://childastrologyapp.com/`
Marketing URL (optional): `https://childastrologyapp.com/`
Privacy Policy URL: `https://childastrologyapp.com/legal.html?doc=privacy`

---

## 2. Localised listing copy (repositioned)

### English

**Subtitle** (≤ 30): `Observe and support your child`

**Promotional text** (≤ 170):
`A calm observation method for parents: notice your child's temperament, emotions, communication and learning style, then pick one gentle way to support them today. No predictions.`

**Keywords** (≤ 100, comma-separated, no spaces) — exactly 100 chars:
`parenting,child development,understand child,temperament,emotions,learning style,parent guide,observe`

**Description** (≤ 4000):
```
Child Compass is a calm observation method for parents and legal guardians
who want to understand their child as an individual — and choose one
small, concrete way to support them today.

It is built around a fixed 6-step routine — observe, connect, reflect,
understand, support, evaluate — and a private space for your own notes
about one specific child over time. Astrology is used only as a fixed
symbolic vocabulary for describing temperament and needs, the way other
apps use a personality framework. The app makes no predictions, no fate
claims, and no medical, psychological, speech or educational assessment.

WHAT YOU DO
• Keep a private profile for each child (a nickname and birth details)
  and structured notes on mood, behaviour and development.
• Work through the 6-step method to turn one observation into one
  supportive action.
• Read a plain-language summary of your child's likely temperament,
  emotional style, communication style and learning style, with
  practical, non-clinical suggestions.
• Get ideas for physical activity, school support and everyday
  situations, organised into simple categories.
• Ask an ordinary parenting question and get a fixed, on-device answer,
  with a clear hand-off to a qualified professional whenever that is the
  right next step.
• Optional, clearly separated extras for the adult: one reflection card a
  day, and "Parent Scent" — an adults-only symbolic fragrance idea that
  never uses your child's data.

WHAT THIS IS NOT
There is no daily horoscope feed, no fortune-telling, no palmistry and no
"what will happen" content. The focus is a repeatable parenting routine
and your own longitudinal notes, kept entirely on your device.

PRIVACY BY DESIGN
• Every child profile, note, chart and question stays on your device and
  is never uploaded.
• Sign-in uses only your e-mail address and a one-time code. You can
  delete your account and all local data in Settings.
• Optional analytics is off by default and never receives names, birth
  data or your notes.

FOR ADULTS
Child Compass is for a parent, not for a child. You confirm you are 18+
and legally entitled to add each child's details. The app does not
replace professional advice — if you are worried about your child's
development, health, speech or behaviour, please contact a qualified
professional.
```

### Dutch (nl)

**Subtitle**: `Observeer en steun je kind`

**Promotional text**:
`Een rustige observatiemethode voor ouders: merk het temperament, de emoties, communicatie en leerstijl van je kind op, en kies vandaag één milde manier om te steunen. Geen voorspellingen.`

**Keywords**:
`opvoeding,kind begrijpen,temperament,emoties,leerstijl,oudergids,observeren,ontwikkeling,gezin,karakter`

**Description**: translate the English block above, keeping the same
section order and the "voor volwassen ouders / geen voorspellingen / geen
horoscoopfeed / gegevens blijven op je apparaat / vervangt geen
professioneel advies" phrasing already used in `legal.js` and the in-app
consent screen.

*(RU / UA store localisations optional; only add ones you can proofread.)*

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

**Demo account / how the reviewer signs in:** create a real inbox you control
for reviewers. Put its address and precise inbox-access instructions in App
Review Notes so Apple can retrieve the Supabase OTP without contacting you.
Do not publish a fixed code or client-side authentication bypass. If shared
inbox access cannot be provided, arrange a fresh code through Resolution
Center, understanding that this may delay review.

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

---

## 8. Guideline 4.3(b) response plan (Design – Spam)

Apple's position: too many astrology apps; ours "duplicates" them.

**Do all of these together for the next submission (build 1.0 (20)+):**

1. **Rename** the App Store name to a parenting name (§0). This is the
   single highest-impact change.
2. **Paste the repositioned copy** from §2 (subtitle, promo text,
   keywords, description) in every localisation. Keep the astrology
   mentions minimal and always framed as "a symbolic vocabulary".
3. **Move the primary category to Education** (§1).
4. **Screenshots** must show the *method and notes*, not the star chart:
   frame 1 = the 6-step method screen; frame 2 = a child profile with
   notes; frame 3 = the plain-language temperament summary; frame 4 = the
   "ask a question" screen with the professional hand-off; frame 5 = the
   privacy / delete-account screen. Put a one-line parenting caption on
   each. Do NOT lead with the natal-chart wheel.
5. **Reply in Resolution Center** with the text in
   `APP_REVIEW_APPEAL_43b.md` when you resubmit.
6. Fix the icon (Guideline 2.3.8) — handled in `ios-build.yml`
   ("Install the real app icon" step) from build 1.0 (20).

If Apple still rejects under 4.3(b) after this, the remaining routes are:
a formal appeal to the App Review Board (button in Resolution Center), or
accept Apple's own suggestion and ship only as the existing PWA at
`childastrologyapp.com` ("Add to Home Screen").
