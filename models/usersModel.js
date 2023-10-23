const { User } = require("../schemas/userSchema");

exports.fetchAllUsers = async () => {
  const result = await User.find();
  return result;
};

exports.fetchUserById = async (_id) => {
  if (_id._id.length !== 24) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }
  const user = await User.find(_id);
  return user.length === 0
    ? Promise.reject({ status: 404, message: "Not Found" })
    : user[0];
};

exports.addUser = async (newUser) => {
  const userToAdd = new User(newUser);
  return userToAdd.save();
};

exports.updateUserById = async (_id, property) => {
  const updatedUser = await User.findOneAndUpdate(_id, property, {
    new: true,
  });
  return updatedUser === null
    ? Promise.reject({ status: 404, message: "Not Found" })
    : updatedUser;
};

exports.removeUserById = async (_id) => {
    const deletedUser = await User.findOneAndRemove(_id)
    return deletedUser === null ? Promise.reject({status: 404, message: 'Not Found'}) : deletedUser
}
