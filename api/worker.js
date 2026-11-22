export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const headers = {
      ...corsHeaders,
      "Content-Type": "application/json"
    };

    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({
        status: "online",
        name: "NOVA AI",
        version: "3.0"
      }, { headers });
    }

    return Response.json({
      success: true,
      message: "NOVA AI backend is running!"
    }, { headers });
  }
};