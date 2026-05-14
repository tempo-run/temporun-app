import Stripe from "https://esm.sh/stripe@13.11.0?target=deno&no-check";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") as string;
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  let event: Stripe.Event;

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (signature && webhookSecret) {
      // Valida assinatura quando disponível
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } else {
      // Aceita sem assinatura (novo sistema Event Destinations do Stripe)
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error("Parse error:", err);
    return new Response(`Error: ${(err as Error).message}`, { status: 400 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log(`Evento: ${event.type}`);

  try {
    if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.supabase_user_id;

      console.log(`Subscription ${sub.status} - userId: ${userId}`);

      if (userId) {
        const { error } = await supabase.from("subscriptions").upsert({
          user_id: userId,
          stripe_customer_id: sub.customer as string,
          stripe_subscription_id: sub.id,
          status: sub.status,
          plan: sub.metadata?.plan || "monthly",
          price_id: sub.items.data[0]?.price?.id || "",
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          cancel_at_period_end: sub.cancel_at_period_end,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

        if (error) console.error("Upsert error:", error);
        else console.log(`Subscription salva para user ${userId}`);
      } else {
        console.warn("user_id não encontrado nos metadados");
      }

    } else if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object as Stripe.Subscription;
      if (sub.metadata?.supabase_user_id) {
        await supabase.from("subscriptions")
          .update({ status: "canceled", updated_at: new Date().toISOString() })
          .eq("user_id", sub.metadata.supabase_user_id);
      }

    } else if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id
        || (session as any).subscription_data?.metadata?.supabase_user_id;

      console.log(`Checkout completado - userId: ${userId}`);

      if (userId) {
        await supabase.from("checkouts").upsert({
          user_id: userId,
          stripe_session_id: session.id,
          status: session.status,
          updated_at: new Date().toISOString(),
        }, { onConflict: "stripe_session_id" });

        // Busca a subscription criada e atualiza
        if (session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription as string);
          await supabase.from("subscriptions").upsert({
            user_id: userId,
            stripe_customer_id: sub.customer as string,
            stripe_subscription_id: sub.id,
            status: sub.status,
            plan: sub.metadata?.plan || "monthly",
            price_id: sub.items.data[0]?.price?.id || "",
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
            cancel_at_period_end: sub.cancel_at_period_end,
            updated_at: new Date().toISOString(),
          }, { onConflict: "user_id" });
          console.log(`Subscription criada via checkout para user ${userId}`);
        }
      }

    } else if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice;
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_customer_id", invoice.customer as string)
        .maybeSingle();
      if (sub?.user_id) {
        await supabase.from("subscriptions")
          .update({ status: "past_due", updated_at: new Date().toISOString() })
          .eq("user_id", sub.user_id);
      }
    }

    return new Response(JSON.stringify({ received: true, type: event.type }), {
      headers: { ...cors, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Processing error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
