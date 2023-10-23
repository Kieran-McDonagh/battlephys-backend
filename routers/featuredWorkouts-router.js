const { getAllFeaturedWorkouts } = require("../controllers/featuredWorkoutsController");

const featuredWorkoutsRouter = require("express").Router();

featuredWorkoutsRouter.route("/").get(getAllFeaturedWorkouts)



module.exports = featuredWorkoutsRouter;