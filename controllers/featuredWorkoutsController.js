const { fetchAllFeaturedWorkouts, fetchFeaturedWorkoutById } = require("../models/featuredWorkoutsModel");

exports.getAllFeaturedWorkouts = (req, res, next) => {
  fetchAllFeaturedWorkouts().then((data) => {
    res.status(200).send({ featuredWorkouts: data });
  }).catch(next)
};

exports.getFeaturedWorkoutById = (req, res, next) => {
    const _id = req.params
    fetchFeaturedWorkoutById(_id).then((data) => {
        res.status(200).send({featuredWorkout: data})
    }).catch(next)
}