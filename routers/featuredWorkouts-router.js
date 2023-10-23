const { getAllFeaturedWorkouts, getFeaturedWorkoutById, postFeaturedWorkout } = require("../controllers/featuredWorkoutsController");

const featuredWorkoutsRouter = require("express").Router();

featuredWorkoutsRouter.route("/").get(getAllFeaturedWorkouts).post(postFeaturedWorkout)

featuredWorkoutsRouter.route("/:_id").get(getFeaturedWorkoutById)

module.exports = featuredWorkoutsRouter;