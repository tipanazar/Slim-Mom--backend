const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const productsRouter = require("./routes/api/products");
const diaryRouter = require("./routes/api/diary");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/products", productsRouter);
app.use("/api/diary", diaryRouter);
app.use("/api/auth", authRouter);

app.use("/api/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  err.status
    ? res.status(err.status).json({ message: err.message })
    : res.status(500).json({ message: "Server Error" });
});

module.exports = app;
