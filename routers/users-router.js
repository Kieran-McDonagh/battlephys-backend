const userRouter = require("express").Router();
const { getAllUsers, getUserByName } = require("../controllers/usersController");

userRouter.route("/").get(getAllUsers);

userRouter
  .route('/:username')
  .get(getUserByName)

module.exports = userRouter;
