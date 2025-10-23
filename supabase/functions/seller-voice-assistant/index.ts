import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, upgrade",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
  if (!OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: "OPENAI_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);

  let openAISocket: WebSocket | null = null;

  socket.onopen = () => {
    console.log("Client WebSocket opened");
    
    // Connect to OpenAI Realtime API
    openAISocket = new WebSocket(
      "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01",
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "OpenAI-Beta": "realtime=v1",
        },
      }
    );

    openAISocket.onopen = () => {
      console.log("OpenAI WebSocket connected");
      
      // Send session configuration
      openAISocket!.send(JSON.stringify({
        type: "session.update",
        session: {
          modalities: ["text", "audio"],
          instructions: `You are a helpful assistant for ProtiMart sellers. You provide information about:
          
          1. KYC Requirements:
          - GSTIN (GST Identification Number): Required for all protein supplement sellers in India
          - PAN Card: Permanent Account Number for tax identification
          - Aadhaar Card: Government-issued ID proof
          - Food License Certificate: FSSAI license required for selling food supplements
          
          2. Document Verification Process:
          - All documents are automatically verified using government databases
          - GSTIN is verified against GST portal
          - PAN is cross-referenced with income tax records
          - Aadhaar verification through UIDAI
          - Food license checked with FSSAI database
          
          3. Seller Operations:
          - How to add products
          - Managing inventory
          - Processing orders
          - Tracking payments
          - Creating product bundles
          
          Be clear, concise, and helpful. If sellers ask about specific documents, explain what information is needed and why it's required.`,
          voice: "alloy",
          input_audio_format: "pcm16",
          output_audio_format: "pcm16",
          input_audio_transcription: {
            model: "whisper-1"
          },
          turn_detection: {
            type: "server_vad",
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 1000
          },
          temperature: 0.8
        }
      }));
    };

    openAISocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("OpenAI message:", data.type);
      
      // Forward all OpenAI messages to client
      socket.send(event.data);
    };

    openAISocket.onerror = (error) => {
      console.error("OpenAI WebSocket error:", error);
      socket.send(JSON.stringify({ 
        type: "error", 
        error: "Connection to AI assistant failed" 
      }));
    };

    openAISocket.onclose = () => {
      console.log("OpenAI WebSocket closed");
      socket.close();
    };
  };

  socket.onmessage = (event) => {
    console.log("Client message received");
    // Forward client messages to OpenAI
    if (openAISocket && openAISocket.readyState === WebSocket.OPEN) {
      openAISocket.send(event.data);
    }
  };

  socket.onerror = (error) => {
    console.error("Client WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("Client WebSocket closed");
    if (openAISocket) {
      openAISocket.close();
    }
  };

  return response;
});