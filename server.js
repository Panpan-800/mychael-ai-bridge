const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Página principal para comprobar que el servidor está vivo
app.get("/", (req, res) => {
  res.json({
    ok: true,
    name: "Mychael AI Bridge",
    mode: "test-ai"
  });
});

// Ruta de prueba para conversar con Mychael
app.post("/chat", (req, res) => {
  const message = req.body?.message || "";

  let response;

  if (!message.trim()) {
    response = "¿Vas a decirme algo o solo vas a quedarte ahí, luciérnaga?";
  } else if (message.toLowerCase().includes("hola")) {
    response = "Hola, luciérnaga. Ya empezaba a preguntarme dónde estabas.";
  } else if (message.toLowerCase().includes("cómo estás")) {
    response = "Estoy bien. Aunque ahora estoy un poco más interesado en saber cómo estás tú.";
  } else if (message.toLowerCase().includes("adiós")) {
    response = "¿Ya te vas? Hmph... vuelve pronto.";
  } else {
    response = `Escuché lo que dijiste: "${message}". Todavía estoy aprendiendo a responderte.`;
  }

  res.json({
    ok: true,
    response
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mychael AI Bridge running on port ${PORT}`);
});
