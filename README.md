# Mychael AI Bridge

Small Node/Express server for the future Minecraft Bedrock ↔ AI connection.

Render:
- Runtime: Node
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/health`

Environment variables:
- `OPENAI_API_KEY` — keep this secret; never put it in the Minecraft addon.
- `OPENAI_MODEL` — optional; defaults to `gpt-5.6`.

Endpoints:
- `GET /health`
- `POST /chat` with JSON `{"message":"Hola Mychael"}`

The Minecraft addon will be connected later.
