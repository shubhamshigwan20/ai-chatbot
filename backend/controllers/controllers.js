const db = require("../db/db");
const { getGroqChatCompletion } = require("../groq/groq");

const textToText = async (req, res) => {
  const { userInput } = req.body;
  //validate using zod

  const chatCompletion = await getGroqChatCompletion(userInput);
  console.log(
    "api response -->",
    chatCompletion.choices[0]?.message?.content || "",
  );
  try {
    return res.status(200).json({
      status: true,
      data: chatCompletion.choices[0]?.message?.content || "",
    });
  } catch (err) {
    next(err);
  }
};

const getMessages = async (req, res) => {
  try {
    const result = await db.query(`SELECT id, type, content FROM messages`);
    if (!result.rowCount) {
      return res.status(404).json({
        status: false,
        message: "no data found",
      });
    }

    return res.status(200).json({
      status: true,
      data: result.rows,
    });
  } catch (err) {
    next(err);
  }
};

const insertMessages = async (req, res, next) => {
  const { messages } = req.body;
  //zod validation
  try {
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        status: false,
        message: "messages must be a non-empty array",
      });
    }

    const values = [];
    const placeholders = messages
      .map((message, index) => {
        const baseIndex = index * 3;
        values.push(message.id, message.type, message.content);
        return `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3})`;
      })
      .join(", ");

    const result = await db.query(
      `INSERT INTO messages(id, type, content) VALUES ${placeholders}`,
      values,
    );
    if (!result.rowCount) {
      return res.status(500).json({
        status: true,
        message: "internal server error",
      });
    }

    return res.status(200).json({
      status: true,
      message: "data inserted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { textToText, getMessages, insertMessages };
