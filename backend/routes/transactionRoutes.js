const express = require('express')
const router = express.Router()
const {
  getTransactions,
  setTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController')

router.route('/').get(getTransactions).post(setTransaction)
router.route('/:id').delete(deleteTransaction).put(updateTransaction)

module.exports = router