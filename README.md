# 🤖 GPT GitHub Bot

This bot listens to GitHub issue events. When you label an issue with `llm-edit`, it will:
1. Clone the repo
2. Edit a target file using OpenAI GPT
3. Commit the change back to the repo
4. Leave a comment on the issue with the diff
5. Log the interaction (basic console log, can be extended)

## 🚀 Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/gpt-github-bot.git
cd gpt-github-bot
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill it in:

```
GH_TOKEN=your_github_pat
OPENAI_API_KEY=your_openai_key
```

### 3. Deploy to Render

- Connect your GitHub repo to [Render](https://render.com)
- Use `npm install` as build command, `npm start` as start command
- Set environment variables under "Environment"

### 4. Add Webhook in GitHub Repo

- Payload URL: `https://your-render-app.onrender.com/webhook`
- Content type: `application/json`
- Event: `Issues`

## 🧠 Features

- Auto-edits files via GPT
- Commits edits
- Comments diffs
- Basic request logging (can be upgraded to full dashboard)

## 📌 Coming Soon
- Web-based dashboard
- Multiple file processing
- Natural language commands via issue body

---

MIT © YourName