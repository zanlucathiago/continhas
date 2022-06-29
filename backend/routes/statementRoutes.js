const express = require('express')
const router = express.Router()
const {
  setStatement
} = require('../controllers/statementController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, setStatement)

module.exports = router