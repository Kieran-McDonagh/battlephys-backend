const { User } = require("../schemas/userSchema");

exports.seed = async (users) => {
  try {
    await User.collection.drop();
    await User.insertMany(users);
  } catch (err) {
    console.log(err);
  }
}