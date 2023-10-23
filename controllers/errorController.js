exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
};

exports.handleMongoErrors = (err, req, res, next) => {
  if (err.name === "ValidationError" || err.name === 'CastError') {
    res.status(400).send({ message: "Bad Request", details: err.message });
  } else {
    next(err);
  }
};

exports.handleServerError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
};
