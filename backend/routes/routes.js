const router = require("express").Router();

const {
  textToText,
  getMessages,
  insertMessages,
  listModels,
} = require("../controllers/controllers");

router.post("/text-to-text", textToText);
router.get("/get-messages", getMessages);
router.post("/insert-messages", insertMessages);
router.get("/list-models", listModels);

module.exports = router;
