const router = require("express").Router();

const {
  textToText,
  getMessages,
  insertMessages,
} = require("../controllers/controllers");

router.post("/text-to-text", textToText);
router.get("/get-messages", getMessages);
router.post("/insert-messages", insertMessages);

module.exports = router;
