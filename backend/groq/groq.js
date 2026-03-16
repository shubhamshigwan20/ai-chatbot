const Groq = require("groq-sdk");
require("dotenv").config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function getGroqChatCompletion(msg, model) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: msg,
      },
    ],
    model: model,
  });
}

const getModels = async () => {
  return await groq.models.list();
};

module.exports = { getGroqChatCompletion, getModels };
