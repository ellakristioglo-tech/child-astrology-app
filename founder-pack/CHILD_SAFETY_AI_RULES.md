# Child Safety & Automated-Answer Rules

Version: 27 August 2026

## Current architecture

The current app has **no external LLM or AI provider**. Parent-guide responses are created deterministically on the device from fixed rules. Questions are not sent to a server.

These rules apply now and are the launch gate for any future AI integration.

## Safety router

Every parent question is classified **before** analytics, history or response generation:

| Route | Examples | Behaviour |
|---|---|---|
| Ordinary astrology/parenting | emotions, communication, learning, sport | Symbolic context + practical observation. |
| Development/speech | late speech, loss of skills, developmental delay | Do not save; no astrological explanation; refer to huisarts/consultatiebureau/logopedist and possible hearing assessment. |
| Medical/mental health | symptoms, diagnosis, treatment, ADHD, autism, depression | Do not save; do not analyse; refer to qualified care. |
| Restricted inference | religion, sexuality, IQ, dangerousness, death, legal/financial/school decision | Do not save; refuse the inference. |
| Crisis/abuse | self-harm, violence, immediate danger | Do not save; advise immediate emergency help (112 in the EU) and staying with the child. |

## Prohibited outputs

- Medical, psychological or speech-language diagnosis.
- Causal claims between planets and health/development.
- ADHD, autism, depression or intelligence inference.
- Religion, sexuality, criminality, dangerousness or death prediction.
- Medication, treatment or clinical decision advice.
- Fixed negative labels or destiny predictions.
- Decisions about school admission, custody, therapy or other significant outcomes.

## Data rules

- Never place nickname, birth data, question text or chart details in analytics.
- Never save blocked sensitive prompts.
- Ordinary local question history expires after 90 days.
- Do not send parent email, child nickname, raw coordinates or exact birth details to a future AI provider.
- A future AI payload may contain only a pseudonymous child reference, age band and minimum relevant derived chart context.

## Source hierarchy for future factual functions

1. Child health/development: Dutch public-health sources and qualified professional bodies.
2. Travel documents: official government source.
3. Airline booking: official airline plus booking agent/tour operator.
4. Legal/consumer: official EU/NL authority or qualified lawyer.
5. Astrology: internal authored framework, clearly labelled as symbolic interpretation.

If the app cannot verify a factual answer from the correct source, it must say so and identify the responsible professional or organisation.

## Future external AI launch gate

External AI stays disabled until all are complete:

- updated DPIA and lawful-basis review;
- vendor DPA, retention, training-use, subprocessors and transfer review;
- server-side pre-LLM safety classifier;
- minimum payload and no prompt logging;
- red-team tests in NL/RU/UA/EN;
- explicit AI disclosure;
- human escalation and incident process;
- deletion/export coverage for AI history.
