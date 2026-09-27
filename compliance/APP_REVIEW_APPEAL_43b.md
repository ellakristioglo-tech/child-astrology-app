# Resolution Center reply — Guideline 4.3(b) (Design – Spam)

Submission ID: c5a95203-1cd9-419d-8a1f-9ccd3a884fd5 · App: Child Astrology · Version 1.0

Paste the block below into the App Review conversation in App Store Connect
when you resubmit the next verified build (21 or later). Keep it factual and specific; do not
argue about the number of astrology apps in general.

---

Hello,

Thank you for the detailed review. We have made substantial changes for
this build and would like to explain why we believe the app is not a
duplicate of an existing category.

**What the app is.** Child Astrology is a structured observation tool for
one adult parent or legal guardian to use about one specific child. Its
core is a fixed six-step routine (observe, connect, reflect, understand,
support, evaluate) and a private, on-device notebook where the parent
records mood, behaviour and development over time and turns each
observation into one concrete supportive action.

**What the app is not.** There is no daily horoscope feed, no
fortune-telling, no palmistry, no compatibility or "what will happen"
content, and no shareable social feed. Astrology is used only as a fixed
symbolic vocabulary for describing temperament and needs — comparable to
how other apps use a personality framework — and every generated text
states, in the app, that it is not a prediction and not a medical,
psychological, speech or educational assessment. Parenting questions about
health, development, safety or legal matters are intercepted and answered
with links to official sources instead of advice.

**How this build differs from a generic astrology app:**

1. Single-child focus with a longitudinal private notebook, not a
   consumer horoscope stream.
2. A repeatable parenting method (the six steps) that produces one action
   per session.
3. Non-diagnostic guardrails enforced in code (sensitive questions are
   blocked and routed to official sources).
4. Built for the adult only, behind an 18+/authority confirmation; a
   child does not use or sign into the app.
5. All child data is stored on the device and never uploaded; in-app
   account deletion removes the sign-in account and wipes local data;
   optional analytics is off by default and never receives names, birth
   data or notes.

**Changes in this submission:**

- The established App Store name **Child Astrology** is retained. The subtitle,
  description and screenshots now lead with the structured parenting method
  and private notebook so the product's purpose is immediately clear.
- Primary category changed to Education.
- Subtitle, promotional text, keywords and description rewritten to lead
  with the observation method and the per-child notebook; astrology
  mentions minimised and always framed as a symbolic vocabulary.
- Screenshots replaced to show the method, the notebook, the
  plain-language summary, the professional hand-off and the privacy /
  delete-account screen — not the natal-chart wheel.
- App icon finalised (Guideline 2.3.8): the previous build shipped the
  Capacitor template placeholder icon by mistake; this build embeds the
  final, fully opaque brand icon.

A two-minute screen recording of the full flow on a physical device is
attached to this thread.

If any specific element still reads as duplicative, we would be grateful
for guidance on which part to change, and we are happy to make further
adjustments.

Kind regards,
Ella Kristioglo

---

## If this reply is rejected too

- Use the **"Submit an appeal"** button in Resolution Center to escalate
  to the App Review Board. Reuse the text above, add: "We are a new
  independent developer; the app is a genuine parenting tool, not a
  re-skin. We ask the Board to review the concept differentiation listed
  above."
- Or accept Apple's suggestion in the rejection: the same product already
  runs as an installable web app at `https://childastrologyapp.com`
  ("Add to Home Screen"), and can stay there without an App Store listing.
