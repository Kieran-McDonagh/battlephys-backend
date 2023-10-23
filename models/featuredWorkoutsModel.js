const { FeaturedWorkout } = require("../schemas/featuredWorkoutsSchema")


exports.fetchAllFeaturedWorkouts = async () => {
    const data = await FeaturedWorkout.find()
    return data
}