const users = require("./devData/users");
const featuredWorkouts = require('./devData/featuredWorkouts')
const { seed } = require("./seed");
const mongoose = require("mongoose");
require("dotenv").config();

const runSeed = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  return seed(users, featuredWorkouts).then(() => mongoose.connection.close());
};

runSeed();