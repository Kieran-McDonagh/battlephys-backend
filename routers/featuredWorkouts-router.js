const { getAllFeaturedWorkouts, getFeaturedWorkoutById } = require("../controllers/featuredWorkoutsController");

const featuredWorkoutsRouter = require("express").Router();

featuredWorkoutsRouter.route("/").get(getAllFeaturedWorkouts)

featuredWorkoutsRouter.route("/:_id").get(getFeaturedWorkoutById)

module.exports = featuredWorkoutsRouter;