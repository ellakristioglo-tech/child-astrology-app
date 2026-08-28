# Child Astrology

Production source repository for [Child Astrology](https://childastrologyapp.com/), an adult-directed reflective application for parents and legal guardians.

**Canonical repository:** `ellakristioglo-tech/child-astrology-app`  
**Author and product owner:** Ella Kristioglo  
**Status:** Active production project

## Purpose

Child Astrology combines local natal-chart calculations, structured parenting observations, learning and communication guidance, reflective Tarot content, and an adult-only Parent Scent Code.

The application is a reflective and educational tool. It does not diagnose medical, psychological, developmental, speech-language, educational, legal, or other conditions, and it must not replace qualified professional advice.

## Technology

- Static HTML, CSS, and JavaScript
- Astronomy Engine, included under its original third-party license
- Local GeoNames-derived city search data generated during deployment
- Browser `localStorage` for on-device profiles, notes, calculations, and question history
- Node.js regression tests
- GitHub Actions and GitHub Pages
- Optional Google Analytics 4, loaded only after consent

## Privacy architecture

- No user accounts, application backend, remote database, payment flow, or external AI/LLM API
- Child profiles and free-text content remain in the browser on the user's device
- Birthplace search uses a bundled dataset and does not send the query to a geocoding provider
- Latitude and longitude are used in memory for a chart calculation and are removed before the child profile is stored
- Analytics is optional and limited to allow-listed events and broad categories; child identifiers, birth details, coordinates, notes, and question text are excluded
- WhatsApp or email is opened only after an explicit user action

See the live [Privacy Notice, Cookies Notice, and Terms](https://childastrologyapp.com/legal.html) and the records in [`compliance/`](compliance/).

## Deployment

`main` is the production branch. A push to `main` runs privacy and security regression tests, prepares the local city dataset, and deploys the static application to GitHub Pages at the custom domain.

## Security

Please follow [`SECURITY.md`](SECURITY.md) and do not disclose vulnerabilities in a public issue.

## License

This repository is **not open source**. The original application code, texts, translations, visual identity, product concepts, and interpretations are proprietary and are provided under the terms in [`LICENSE`](LICENSE). Third-party components remain governed by their own licenses listed in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

## Contact

- Product owner: [@ellakristioglo-tech](https://github.com/ellakristioglo-tech)
- Privacy and security: `ellakristioglo@gmail.com`
