const { fetchAllFeaturedWorkouts } = require("../models/featuredWorkoutsModel")


exports.getAllFeaturedWorkouts = (req, res, next) => {
    fetchAllFeaturedWorkouts().then((data) => {
        res.status(200).send({featuredWorkouts: data})
    })
}