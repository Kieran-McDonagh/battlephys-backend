const { User } = require("../schemas/userSchema");

exports.fetchAllUsers = async () => {
  const result = await User.find();
  return result;
};

exports.fetchUserByName = async (username) => {
  if (username.username.length < 2) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }
  const user = await User.find(username);
   return user.length === 0 
    ? Promise.reject({ status: 404, message: "Not Found" })
    : user[0];
};
