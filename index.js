import express from 'express';
import simpleGit from 'simple-git';
import axios from 'axios';
import dotenv from 'dotenv';
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
    // ... logic to run LLM here ...
    // Assume result is in a file `edited.js`

    const editGit = simpleGit(localDir);
    await editGit.add('./*');
    await editGit.commit('LLM: Automated edit');
    await editGit.push();

    res.send('LLM edit committed!');
  } else {
    res.send('No action taken.');
  }
});

app.listen(3000, () => console.log('Webhook server running on port 3000'));
