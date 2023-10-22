const { User } = require("../schemas/userSchema");

exports.fetchAllUsers = async () => {
  const result = await User.find();
  return result;
};
