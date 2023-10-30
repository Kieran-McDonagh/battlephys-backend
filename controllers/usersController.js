const {
  fetchAllUsers,
  fetchUserById,
  addUser,
  updateUserById,
  removeUserById,
  fetchUserWorkouts,
  addUserWorkout,
} = require("../models/usersModel");

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((data) => {
      res.status(200).send({ users: data });
    })
    .catch(next);
};

exports.getUserById = (req, res, next) => {
  const _id = req.params;
  fetchUserById(_id)
    .then((data) => {
      res.status(200).send({ user: data });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const newUser = req.body;
  addUser(newUser)
    .then((data) => {
      res.status(201).send({ newUser: data });
    })
    .catch(next);
};

exports.patchUserById = (req, res, next) => {
  const _id = req.params;
  const propertyToUpdate = req.body;
  updateUserById(_id, propertyToUpdate)
    .then((data) => {
      res.status(200).send({ updatedUser: data });
    })
    .catch(next);
};

exports.deleteUserById = (req, res, next) => {
  const _id = req.params;
  removeUserById(_id)
    .then((data) => {
      res.status(200).send({ deletedUser: data });
    })
    .catch(next);
};

exports.getUserWorkouts = (req, res, next) => {
  const _id = req.params;
  fetchUserWorkouts(_id).then((data) => {
    res.status(200).send({workouts: data})
  }).catch(next)
}

exports.postUserWorkout = (req, res, next) => {
  const _id = req.params;
  const workoutToAdd = req.body
  addUserWorkout(_id, workoutToAdd).then((data) => {
    res.status(201).send({newWorkout: data[0]})
  })

}