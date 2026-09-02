# Child Astrology mobile

This folder prepares the existing Child Astrology web app for native iOS and Android distribution with Capacitor 8.

## App identity

- App name: Child Astrology
- Bundle / package ID: com.childastrology.app
- Web source: the repository root
- Generated mobile web directory: mobile/www

## First setup

Requires Node.js compatible with Capacitor 8, Xcode for iOS, and Android Studio for Android.

```bash
cd mobile
npm install
npm run prepare:web
npm run cap:add:ios
npm run cap:add:android
```

After the native projects exist:

```bash
npm run cap:sync
npm run open:ios
npm run open:android
```

## Before TestFlight / Google Play

1. Test language switching RU / UA / EN / NL.
2. Test consent and onboarding from a clean install.
3. Test child creation, city search, chart calculation, Methods, Tarot and Scent.
4. Test local data retention and deletion controls.
5. Confirm external links open correctly from the native WebView.
6. Replace generated native icons and splash screens with the approved Child Astrology branding.
7. Configure Apple signing/team in Xcode and Android signing in Android Studio.
8. Complete App Store privacy labels and Google Play Data Safety declarations from the project's privacy documentation.
9. Upload iOS first to TestFlight for device testing; use an internal/closed test track in Google Play before production.

## Important

Do not publish store badges on marketing material until the corresponding store listing is live.
