const errorHandler = (callback, response) => error => {
  response.status(400)
  callback(error)
}

const asyncHandler = (callback) => (req, res, next) => {
  debugger
  return callback(req, res, next).catch(errorHandler(next, res))
}

module.exports = asyncHandler