# `delete-user` Edge Function

Deletes the calling user's own Supabase auth account. Powers the in‑app
**Settings → Privacy → "Delete account and data"** action (App Store Guideline
5.1.1(v) — in‑app account deletion).

The app invokes it with `supabase.functions.invoke('delete-user')`, which sends
the signed‑in user's access token. The function verifies that token and then
uses the service‑role key (auto‑injected as `SUPABASE_SERVICE_ROLE_KEY`) to
delete that user. No user data other than the email + auth session exists in
Supabase, so nothing else needs cleaning up.

## Deploy from the Supabase dashboard (no CLI)

1. Supabase → project `hcxwzsvicihnkmlrsftv` → **Edge Functions** → **Create a
   new function** (or "Deploy a new function" → "Via editor").
2. Name it exactly **`delete-user`**.
3. Paste the contents of [`index.ts`](./index.ts). Leave "Verify JWT" **on**
   (default) — the app always calls it while signed in.
4. **Deploy**.

That's it. `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are available to every
function automatically; there are no secrets to add.

## Deploy with the CLI (optional)

```bash
supabase login
supabase functions deploy delete-user --project-ref hcxwzsvicihnkmlrsftv
```

## Quick check

Sign in on the site, open the browser console, and run:

```js
const { data, error } = await window.supabase
  .createClient(
    'https://hcxwzsvicihnkmlrsftv.supabase.co',
    'sb_publishable_2bOBvAgrLzuhfPH7LVA0nQ_qqxRJakF'
  )
  .functions.invoke('delete-user');
console.log(data, error);
```

Expected while signed in: `{ ok: true }` and the account is gone. If the
function is missing or returns an error, the app keeps the session and local
data, displays an error and allows retry or contact through the privacy route.
