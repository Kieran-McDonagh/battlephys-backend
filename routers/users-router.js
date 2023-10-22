const userRouter = require("express").Router();
const {
  getAllUsers,
  getUserByName,
  postUser,
} = require("../controllers/usersController");

userRouter.route("/").get(getAllUsers).post(postUser);

userRouter.route("/:username").get(getUserByName);

module.exports = userRouter;
