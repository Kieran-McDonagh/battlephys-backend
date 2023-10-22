const { fetchAllUsers, fetchUserByName } = require("../models/usersModel")

exports.getAllUsers = (req, res, next) => {
    fetchAllUsers().then((data) => {
        res.status(200).send({users: data})
    }).catch(next)
}

exports.getUserByName = (req, res, next) => {
    const username = req.params
    fetchUserByName(username).then((data) => {
        res.status(200).send({user: data})
    }).catch(next)
}