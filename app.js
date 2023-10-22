const express = require("express");
const app = express();
const mongooseConnection = require("./connection");
const apiRouter = require("./routers/api-router");
const {
  handleCustomErrors,
  handleServerError,
} = require("./controllers/errorController");

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handleServerError);

module.exports = app;
