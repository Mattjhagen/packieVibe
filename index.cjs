import express from 'express';
const simpleGit = import "simple-git");
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();
const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const event = req.headers['x-github-event'];
  const payload = req.body;

  if (event === 'issues' && payload.action === 'labeled' && payload.label.name === 'llm-edit') {
    const repoUrl = payload.repository.clone_url.replace('https://', `https://${process.env.GH_TOKEN}@`);
    const localDir = `./tmp-${Date.now()}`;
    const git = simpleGit();

    await git.clone(repoUrl, localDir);

    const targetFile = path.join(localDir, 'example.js');
    if (fs.existsSync(targetFile)) {
      const fileContents = fs.readFileSync(targetFile, 'utf8');

      const response = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You're a helpful code editor. Clean and refactor the code." },
          { role: "user", content: 'Here is the code you should review and fix:\n${fileContents}' }
        ]
      }, {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
      });

      fs.writeFileSync(targetFile, response.data.choices[0].message.content);
      const editGit = simpleGit(localDir);
      await editGit.add('./*');
      await editGit.commit('LLM: Automated edit');
      await editGit.push();
    }

    
    const issue_number = payload.issue.number;
    const repo_owner = payload.repository.owner.login;
    const repo_name = payload.repository.name;

    const diffComment = `The LLM has processed the file and committed the changes.`;
    await axios.post(
      `https://api.github.com/repos/${repo_owner}/${repo_name}/issues/${issue_number}/comments`,
      { body: diffComment },
      { headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` } }
    );

    console.log(`[LOG] Repo: ${repo_name}, Issue #${issue_number} processed and commented.`);
    
    res.send('LLM edit committed!');
  } else {
    res.send('No action taken.');
  }
});

app.listen(3000, () => console.log('Webhook server running on port 3000'));
