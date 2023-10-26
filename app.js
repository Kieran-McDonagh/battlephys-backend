const express = require("express");
const cors = require('cors');
const app = express();
const mongooseConnection = require("./connection");
const apiRouter = require("./routers/api-router");
const {
  handleCustomErrors,
  handleServerError,
  handleMongoErrors,
} = require("./controllers/errorController");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handleMongoErrors);
app.use(handleServerError);

module.exports = app;
