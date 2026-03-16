require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routes/routes");
const errorHandlingMiddleware = require("./middelware/errorHandlingMiddleware");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    service: "backend",
    timestamp: new Date().toISOString(),
  });
});
app.get("/health", (req, res) => {
  return res.status(200).json({
    status: true,
  });
});
app.use(router);
app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
