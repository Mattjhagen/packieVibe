import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  // defaults to process.env["ANTHROPIC_API_KEY"]
  apiKey: "my_api_key",
});

const msg = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 20000,
  temperature: 1,
  system: "create a prototype thats ready to launch work very very extremely hard and output all thoughts and work\n",
  messages: [
    {
      "role": "user",
      "content": [
        {
          "type": "document",
          "source": {
            "type": "base64",
            "media_type": "application/pdf",
            "data": "<base64_encoded_image>"
          }
        },
        {
          "type": "document",
          "source": {
            "type": "base64",
            "media_type": "application/pdf",
            "data": "<base64_encoded_image>"
          }
        },
        {
          "type": "document",
          "source": {
            "type": "base64",
            "media_type": "application/pdf",
            "data": "<base64_encoded_image>"
          }
        }
      ]
    }
  ]
});
console.log(msg);
