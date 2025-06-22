import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const RENDER_API_TOKEN = process.env.RENDER_API_TOKEN;
const SERVICE_ID = process.env.RENDER_SERVICE_ID;
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;

async function streamLogs() {
  try {
    const response = await axios.get(
      `https://api.render.com/v1/services/${SERVICE_ID}/logs`,
      {
        headers: { Authorization: `Bearer ${RENDER_API_TOKEN}` },
      }
    );

    const logs = response.data.logs.slice(-5).join("\n");

    await axios.post(SLACK_WEBHOOK, {
      text: `📦 *Render Logs Update:*\n\`\`\`${logs}\`\`\``,
    });

    console.log("✅ Logs sent to Slack.");
  } catch (err) {
    console.error("❌ Error streaming logs:", err.message);
  }
}

streamLogs();
