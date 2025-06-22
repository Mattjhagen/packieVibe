const axios = require("axios");

const RENDER_API_TOKEN = "your_api_token";
const SERVICE_ID = "your_render_service_id";
const DISCORD_WEBHOOK = "your_discord_webhook_url";

async function streamLogs() {
  const res = await axios.get(
    `https://api.render.com/v1/services/${SERVICE_ID}/logs`,
    {
      headers: { Authorization: `Bearer ${RENDER_API_TOKEN}` },
    }
  );

  const logs = res.data.logs.slice(-5).map(log => `\`\`\`${log}\`\`\``).join("\n");
  await axios.post(DISCORD_WEBHOOK, { content: logs });
}

streamLogs();
