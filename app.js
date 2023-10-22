const express = require("express");
const app = express();
const mongooseConnection = require("./connection");
const { getAllUsers } = require("./controllers/usersController");

app.get("/users", getAllUsers);

module.exports = app;
