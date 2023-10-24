const mongoose = require("mongoose");
const { Schema } = mongoose;

const featuredWorkoutSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  body: {
    type: Schema.Types.Mixed,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const FeaturedWorkout = mongoose.model(
  "FeaturedWorkout",
  featuredWorkoutSchema
);

module.exports = { FeaturedWorkout };
