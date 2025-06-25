export 
  default {
async
fetch (request, env) {
const
tasks
= 0;
// prompt - simple completion style input
let simple = prompt:
"Tell me
a joke about Cloudflare'
} ;
let response
= await env.AI.run@c/meta/llama-3-8b-instruct', si
tasks.push(f inputs: simple, response });
messages
chat style input
let
chat
= {
messages:
{ role:
'system', content:
'You are a helpful assistant. },
{role:
'user', content:
Who won the world series in 2020?'
} ;
response = await env.Al. run('@cf/meta/llama-3-8b-instruct',
chat);
tasks.push({ inputs: chat, response });
return Response. json (tasks);
 }
}
};
