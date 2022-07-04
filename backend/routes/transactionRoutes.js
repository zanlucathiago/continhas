const express = require('express')
const router = express.Router()
const {
  getTransactions,
  setTransaction,
  updateTransaction,
  deleteTransaction,
  getTransaction,
} = require('../controllers/transactionController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTransactions).post(protect, setTransaction)
router.route('/:id').get(protect, getTransaction).delete(protect, deleteTransaction).put(protect, updateTransaction)

module.exports = router