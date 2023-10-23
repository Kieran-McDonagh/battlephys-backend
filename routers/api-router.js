const apiRouter = require("express").Router();
const featuredWorkoutsRouter = require("./featuredWorkouts-router");
const userRouter = require("./users-router");

apiRouter.use("/users", userRouter);
apiRouter.use("/featuredWorkouts", featuredWorkoutsRouter);

module.exports = apiRouter;
