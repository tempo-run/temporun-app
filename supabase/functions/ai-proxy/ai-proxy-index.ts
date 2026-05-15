const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY")!;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const { system, messages, max_tokens = 1400, model = "claude-haiku-4-5-20251001" } = await req.json();

    if (!system || !messages) {
      return new Response(JSON.stringify({ error: "system e messages são obrigatórios" }), {
        status: 400, headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // Cap at 4000 to avoid abuse
    const tokens = Math.min(max_tokens, 4000);

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model, max_tokens: tokens, system, messages }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Anthropic error:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: data.error?.message || "Erro na API" }), {
        status: res.status, headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...cors, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("ai-proxy error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
