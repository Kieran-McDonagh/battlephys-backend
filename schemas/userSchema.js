const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  workouts: {
    type: [String],
  },
  savedWorkouts: {
    type: [String],
  },
  admin: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = { User };
