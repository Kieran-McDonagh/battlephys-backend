const { FeaturedWorkout } = require("../schemas/featuredWorkoutsSchema");
const { User } = require("../schemas/userSchema");
FeaturedWorkout

exports.seed = async (users, featuredWorkouts) => {
  try {
    await User.collection.drop();
    await User.insertMany(users);
    await FeaturedWorkout.collection.drop()
    await FeaturedWorkout.insertMany(featuredWorkouts)
  } catch (err) {
    console.log(err);
  }
}