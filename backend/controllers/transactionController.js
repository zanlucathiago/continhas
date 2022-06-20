const asyncHandler = require('express-async-handler')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
  res.status(200).json('goals')
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setTransaction = asyncHandler(async (req, res) => {
  if (!req.body.description) {
    res.status(400)
    throw new Error('Adicione uma descrição para a transação');
  }

  res.status(200).json('goal')
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateTransaction = asyncHandler(async (req, res) => {
  res.status(200).json('updatedTransaction')
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteTransaction = asyncHandler(async (req, res) => {
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getTransactions,
  setTransaction,
  updateTransaction,
  deleteTransaction,
}