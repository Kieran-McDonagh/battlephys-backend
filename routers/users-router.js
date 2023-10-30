const userRouter = require("express").Router();
const {
  getAllUsers,
  getUserById,
  postUser,
  patchUserById,
  deleteUserById,
  getUserWorkouts,
  postUserWorkout
} = require("../controllers/usersController");

userRouter.route("/").get(getAllUsers).post(postUser);

userRouter.route("/:_id").get(getUserById).patch(patchUserById).delete(deleteUserById)

userRouter.route('/:_id/workouts').get(getUserWorkouts).post(postUserWorkout)

module.exports = userRouter;
