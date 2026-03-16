const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
  }
  return res.status(500).json({
    status: false,
    message: "internal server error",
  });
};

module.exports = errorHandlingMiddleware;
