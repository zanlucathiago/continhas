const asyncHandler = require('express-async-handler')

const Transaction = require('../models/transactionModel')

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find()
  res.status(200).json(transactions)
})

// @desc    Set transaction
// @route   POST /api/transactions
// @access  Private
const setTransaction = asyncHandler(async (req, res) => {
  if (!req.body.description) {
    res.status(400)
    throw new Error('Adicione uma descrição para a transação');
  }
  const transaction = await Transaction.create({
    description: req.body.description,
  })

  res.status(200).json(transaction)
})

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id)

  if (!transaction) {
    res.status(400)
    throw new Error('Transação não encontrada')
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedTransaction)
})

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id)

  if (!transaction) {
    res.status(400)
    throw new Error('Transação não encontrada')
  }

  await transaction.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getTransactions,
  setTransaction,
  updateTransaction,
  deleteTransaction,
}