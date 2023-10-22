const { fetchAllUsers } = require("../models/usersModel")

exports.getAllUsers = (req, res, next) => {
    fetchAllUsers().then((data) => {
        res.status(200).send({users: data})
    })
}