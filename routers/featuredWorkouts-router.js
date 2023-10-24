const { getAllFeaturedWorkouts, getFeaturedWorkoutById, postFeaturedWorkout, patchFeaturedWorkout, deleteFeaturedWorkout } = require("../controllers/featuredWorkoutsController");

const featuredWorkoutsRouter = require("express").Router();

featuredWorkoutsRouter.route("/").get(getAllFeaturedWorkouts).post(postFeaturedWorkout)

featuredWorkoutsRouter.route("/:_id").get(getFeaturedWorkoutById).patch(patchFeaturedWorkout).delete(deleteFeaturedWorkout)

module.exports = featuredWorkoutsRouter;