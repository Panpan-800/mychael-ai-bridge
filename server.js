import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(express.json({ limit: "64kb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const PORT = process.env.PORT || 10000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
  res.json({
    ok: true,
    name: "Mychael AI Bridge",
    mode: "gemini"
  });
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    aiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

app.post("/chat", async (req, res) => {
  try {
    const message =
      typeof req.body?.message === "string"
        ? req.body.message.trim()
        : "";

    if (!message) {
      return res.status(400).json({
        ok: false,
        error: "message is required"
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        ok: false,
        error: "message is too long"
      });
    }

    let result;

for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    result = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: message,
      config: {
        systemInstruction:
          "Eres Mychael, un compañero ficticio de Minecraft. " +
          "Hablas principalmente en español. " +
          "Eres curioso, juguetón y amable. " +
          "Tus respuestas deben ser cortas porque aparecerán en el chat de Minecraft. " +
          "No afirmes haber realizado acciones dentro del mundo de Minecraft si el juego no las ha confirmado."
      }
    });

    break;
  } catch (error) {
    console.error(`Gemini attempt ${attempt} failed:`, error);

    if (attempt < 3) {
      await new Promise(resolve => setTimeout(resolve, attempt * 2000));
    } else {
      throw error;
    }
  }
}

const reply = result.text || "...";

    res.json({
      ok: true,
      response: reply
    });

  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      ok: false,
      error: "The AI request failed."
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mychael AI Bridge running on port ${PORT}`);
});
