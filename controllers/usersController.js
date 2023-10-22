const { fetchAllUsers, fetchUserByName, addUser } = require("../models/usersModel")

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

exports.postUser = ((req, res, next) => {
    const newUser = req.body
    addUser(newUser).then((data) => {
        res.status(201).send({newUser: data})
    }).catch(next)
})