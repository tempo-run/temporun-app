import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });
const WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Assinatura ausente", { status: 400 });
  const body = await req.text();
  let event: Stripe.Event;
  try { event = await stripe.webhooks.constructEventAsync(body, signature, WEBHOOK_SECRET); }
  catch (err) { return new Response(`Webhook Error: ${err.message}`, { status: 400 }); }
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  try {
    if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.supabase_user_id;
      if (userId) await supabase.from("subscriptions").upsert({ user_id: userId, stripe_customer_id: sub.customer as string, stripe_subscription_id: sub.id, status: sub.status, plan: sub.metadata?.plan || "monthly", price_id: sub.items.data[0]?.price?.id || "", current_period_end: new Date(sub.current_period_end * 1000).toISOString(), cancel_at_period_end: sub.cancel_at_period_end, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    } else if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object as Stripe.Subscription;
      if (sub.metadata?.supabase_user_id) await supabase.from("subscriptions").update({ status: "canceled", updated_at: new Date().toISOString() }).eq("user_id", sub.metadata.supabase_user_id);
    } else if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      if (userId) await supabase.from("checkouts").upsert({ user_id: userId, stripe_session_id: session.id, status: session.status, updated_at: new Date().toISOString() }, { onConflict: "stripe_session_id" });
    } else if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice;
      const { data: sub } = await supabase.from("subscriptions").select("user_id").eq("stripe_customer_id", invoice.customer as string).maybeSingle();
      if (sub?.user_id) await supabase.from("subscriptions").update({ status: "past_due", updated_at: new Date().toISOString() }).eq("user_id", sub.user_id);
    }
    return new Response(JSON.stringify({ received: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) { return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
});
