import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json({ limit: "64kb" }));

const PORT = Number(process.env.PORT) || 10000;
const MODEL = process.env.OPENAI_MODEL || "gpt-5.6";

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

app.get("/", (_req, res) => {
  res.json({ ok: true, name: "Mychael AI Bridge" });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(client) });
});

app.post("/chat", async (req, res) => {
  try {
    const message = typeof req.body?.message === "string"
      ? req.body.message.trim()
      : "";

    if (!message) {
      return res.status(400).json({ ok: false, error: "message is required" });
    }

    if (message.length > 2000) {
      return res.status(400).json({ ok: false, error: "message is too long" });
    }

    if (!client) {
      return res.status(503).json({
        ok: false,
        error: "OPENAI_API_KEY is not configured yet."
      });
    }

    const response = await client.responses.create({
      model: MODEL,
      instructions:
        "You are Mychael, a fictional Minecraft companion. " +
        "Speak Spanish unless the player asks for another language. " +
        "Be friendly, curious, and playful. " +
        "Keep replies short enough for Minecraft chat. " +
        "Do not claim to change the Minecraft world unless the game reports that action.",
      input: message
    });

    res.json({ ok: true, reply: response.output_text || "..." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "The AI request failed." });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mychael AI Bridge listening on port ${PORT}`);
});
