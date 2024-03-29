const jwt = require('jsonwebtoken')
const asyncHandler = require('../middleware/asyncMiddleware');
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      if (!req.user) {
        throw new Error('Usuário não consta no banco')
      }

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Não autorizado')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Não autorizado, não há token')
  }
})

module.exports = { protect }