// Supabase Edge Function: delete-user
// Deletes the calling user's own auth account (App Store Guideline 5.1.1(v):
// in-app account deletion for apps that support account creation).
//
// The app calls this with supabase-js `functions.invoke('delete-user')`, which
// sends the signed-in user's access token as `Authorization: Bearer <jwt>`.
// We verify that token, then use the service-role key to delete that user.
//
// Deploy: see README.md in this folder. No secrets to set by hand — the
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars are provided automatically
// to every Edge Function.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);

  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "missing bearer token" }, 401);

  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) return json({ error: "function not configured" }, 500);

  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await admin.auth.getUser(token);
  if (error || !data?.user) return json({ error: "invalid token" }, 401);

  const del = await admin.auth.admin.deleteUser(data.user.id);
  if (del.error) return json({ error: del.error.message }, 500);

  return json({ ok: true });
});
