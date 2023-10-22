exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.message) {
        res.status(err.status).send({message: err.message})
    }
}

exports.handleServerError = (err, req, res, next) => {
    console.log(err);
    res.status(500).send(err)
}