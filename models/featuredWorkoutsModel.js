const { FeaturedWorkout } = require("../schemas/featuredWorkoutsSchema");

exports.fetchAllFeaturedWorkouts = async () => {
  const data = await FeaturedWorkout.find();
  return data;
};

exports.fetchFeaturedWorkoutById = async (_id) => {
  if (_id._id.length !== 24) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }
  const data = await FeaturedWorkout.find(_id);
  return data.length === 0
    ? Promise.reject({ status: 404, message: "Not Found" })
    : data[0];
};

exports.addFeaturedWorkout = async (featuredWorkoutToAdd) => {
  const newFeaturedWorkout = new FeaturedWorkout(featuredWorkoutToAdd);
  return newFeaturedWorkout.save();
};

exports.updateFeaturedWorkout = async (_id, propertyToUpdate) => {
  const updatedProperty = await FeaturedWorkout.findOneAndUpdate(
    _id,
    propertyToUpdate,
    {
      new: true,
    }
  );
  return updatedProperty === null
    ? Promise.reject({ status: 404, message: "Not Found" })
    : updatedProperty;
};

exports.removeFeaturedWorkout = async (_id) => {
  const deletedWorkout = await FeaturedWorkout.findOneAndRemove(_id);
  return deletedWorkout === null
    ? Promise.reject({ status: 404, message: "Not Found" })
    : deletedWorkout;
};
