import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const PRICE_IDS: Record<string, string> = {
  monthly: Deno.env.get("STRIPE_PRICE_MONTHLY") || "price_MONTHLY_ID_AQUI",
  yearly:  Deno.env.get("STRIPE_PRICE_YEARLY")  || "price_YEARLY_ID_AQUI",
};
const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Não autorizado" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (authError || !user) return new Response(JSON.stringify({ error: "Token inválido" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { plan, success_url, cancel_url } = await req.json();
    if (!PRICE_IDS[plan]) return new Response(JSON.stringify({ error: "Plano inválido" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const { data: existingSub } = await supabase.from("subscriptions").select("stripe_customer_id").eq("user_id", user.id).maybeSingle();
    let customerId = existingSub?.stripe_customer_id;
    if (!customerId) { const c = await stripe.customers.create({ email: user.email, metadata: { supabase_user_id: user.id } }); customerId = c.id; }
    const session = await stripe.checkout.sessions.create({ customer: customerId, mode: "subscription", payment_method_types: ["card"], line_items: [{ price: PRICE_IDS[plan], quantity: 1 }], success_url: success_url || "https://app.temporun.run?pro=success", cancel_url: cancel_url || "https://app.temporun.run?pro=cancel", subscription_data: { metadata: { supabase_user_id: user.id, plan } }, locale: "pt-BR", allow_promotion_codes: true });
    return new Response(JSON.stringify({ url: session.url }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) { return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
});
