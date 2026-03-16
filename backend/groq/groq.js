const Groq = require("groq-sdk");
require("dotenv").config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function getGroqChatCompletion(msg) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: msg,
      },
    ],
    model: "openai/gpt-oss-20b",
  });
}

module.exports = { getGroqChatCompletion };
