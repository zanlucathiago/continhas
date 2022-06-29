const asyncHandler = require('express-async-handler')

const Transaction = require('../models/transactionModel')

const hasValidParams = (text, index) => text && index;

// @desc    Set statement
// @route   POST /api/statements
// @access  Private
const setStatement = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Por favor envie o arquivo')
  }

  const parseTransaction = text => {
    const [date, value, identifier, description] = text.split(',')
    return { date: new Date(date.split('/').reverse().join('-')), value, identifier, description, user: req.user.id }
  }
  
  const transactions = await Transaction.insertMany(req.body.text.split('\n').filter(hasValidParams).map(parseTransaction))

  res.status(200).json(transactions)
})

module.exports = {
  setStatement,
}