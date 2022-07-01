const asyncHandler = (callback) => (req, res, next) => callback(req, res, next).catch(next)

module.exports = asyncHandler