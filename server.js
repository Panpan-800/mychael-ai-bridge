import express from "express";

const app = express();

app.use(express.json({ limit: "64kb" }));

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.json({
    ok: true,
    name: "Mychael AI Bridge",
    mode: "test-ai"
  });
});

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    aiConfigured: false
  });
});

app.post("/chat", (req, res) => {
  const message = req.body?.message || "";

  let response;

  if (!message.trim()) {
    response = "¿Vas a decirme algo o solo vas a quedarte ahí, luciérnaga?";
  } 
  else if (message.toLowerCase().includes("hola")) {
    response = "Hola, luciérnaga. Ya empezaba a preguntarme dónde estabas.";
  } 
  else if (message.toLowerCase().includes("cómo estás")) {
    response = "Estoy bien. Aunque ahora estoy más interesado en saber cómo estás tú.";
  } 
  else if (message.toLowerCase().includes("adiós")) {
    response = "¿Ya te vas? Hmph... vuelve pronto.";
  } 
  else {
    response = `Escuché lo que dijiste: "${message}". Todavía estoy aprendiendo a responderte.`;
  }

  res.json({
    ok: true,
    response: response
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mychael AI Bridge running on port ${PORT}`);
});
