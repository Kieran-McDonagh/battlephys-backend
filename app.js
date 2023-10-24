const express = require("express");
const app = express();
const uri = require("./connection");
const mongoose = require("mongoose");
mongoose.connect(uri);
const apiRouter = require("./routers/api-router");
const {
  handleCustomErrors,
  handleServerError,
  handleMongoErrors,
} = require("./controllers/errorController");

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handleMongoErrors);
app.use(handleServerError);

module.exports = app;
