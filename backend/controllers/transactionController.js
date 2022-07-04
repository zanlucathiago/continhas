const moment = require('moment')
moment.locale('pt-br');
const asyncHandler = require('../middleware/asyncMiddleware');

const Transaction = require('../models/transactionModel');
const Reference = require('../models/referenceModel');
const { ACCOUNT_MAPPER } = require('../enums/account');
const Statement = require('../models/statementModel');
const Account = require('../models/accountModel');

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
  const statement = await Statement.findOne({
    account: req.query.account,
    user: req.user.id
  })

  const getGrouped = async () => {
    if (statement) {
      const grouped = await Transaction.aggregate([
        {
          $match: { statement: statement._id }
        },
        {
          $group: { _id: "$date", transactions: { $push: '$$ROOT' } },
        },
        {
          $sort: { _id: -1 },
        }])
      const { formatter } = ACCOUNT_MAPPER[req.query.account]

      const formatTransaction = ({ reference, _id, value }) => ({
        ...formatter(value, reference.split(',')),
        _id,
        value: Math.abs(value).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
      })

      const formatGroups = ({
        _id,
        transactions,
      }) => ({
        date: moment.utc(_id).format('ddd[, ]D[ de ]MMM[ de ]YYYY').toUpperCase(),
        transactions: transactions.map(formatTransaction),
      })

      return grouped.map(formatGroups)
    }

    return []
  }
  const result = await getGrouped()
  res.status(200).json(result)
})

// @desc    Get transaction
// @route   GET /api/transactions/:id
// @access  Private
const getTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id)
  const statement = await Statement.findById(transaction.statement._id)

  if (!transaction) {
    res.status(400)
    throw new Error('Transação não encontrada')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('Usuário não encontrado')
  }

  // Make sure the logged in user matches the transaction user
  if (statement.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Usuário não autorizado')
  }

  const references = await Reference.find({
    transaction,
  }).populate('account')

  const accountCount = await Account.count({ user: req.user.id })

  res.status(200).json({
    hasAccounts: accountCount > 0,
    reports: references.map(({ _id, account, value }) => ({
      _id, account: account.title, value: Math.abs(value).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })
    })),
    // reports: references,
    rawValue: Math.abs(transaction.value),
    date: moment.utc(transaction.date).format('ddd[, ]D[ de ]MMM[ de ]YYYY'),
    description: transaction.reference.split(',')[ACCOUNT_MAPPER[statement.account].descriptionIndex].split(' - ').join('\n'),
    _id: transaction._id,
    value: Math.abs(transaction.value).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }),
  })
})

// @desc    Set transaction
// @route   POST /api/transactions
// @access  Private
const setTransaction = asyncHandler(async (req, res) => {
  if (!req.body.description) {
    res.status(400)
    throw new Error('Por favor adicione uma descrição')
  }

  const transaction = await Transaction.create({
    description: req.body.description,
    user: req.user.id,
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

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('Usuário não encontrado')
  }

  // Make sure the logged in user matches the transaction user
  if (transaction.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Usuário não autorizado')
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

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('Usuário não encontrado')
  }

  // Make sure the logged in user matches the transaction user
  if (transaction.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Usuário não autorizado')
  }

  await transaction.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getTransactions,
  getTransaction,
  setTransaction,
  updateTransaction,
  deleteTransaction,
}