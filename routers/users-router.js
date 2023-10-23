const userRouter = require("express").Router();
const {
  getAllUsers,
  getUserById,
  postUser,
  patchUserById,
  deleteUserById
} = require("../controllers/usersController");

userRouter.route("/").get(getAllUsers).post(postUser);

userRouter.route("/:_id").get(getUserById).patch(patchUserById).delete(deleteUserById)

module.exports = userRouter;
