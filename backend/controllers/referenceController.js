const moment = require('moment')
moment.locale('pt-br');
const asyncHandler = require('../middleware/asyncMiddleware');

const Reference = require('../models/referenceModel');
const { ACCOUNT_MAPPER } = require('../enums/account');
const Statement = require('../models/statementModel');
const Account = require('../models/accountModel');
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const queries = require('../queries')
// @desc    Get references
// @route   GET /api/references
// @access  Private
const getReferences = asyncHandler(async (req, res) => {
  const referenceAccount = await Account.findById(req.query.account)
  const user = await User.findById(req.user.id)

  const getGrouped = async () => {
    const grouped = await Reference.aggregate(queries.getReferenceList(user, referenceAccount))

    const formatReference = ({ transactions: [{ reference, statements: [{ account }] }], _id, value }) => {
      const { formatter } = ACCOUNT_MAPPER[account]
      return ({
        ...formatter(value, reference.split(',')),
        _id,
        value: Math.abs(value).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
      })
    }

    const formatGroups = ({
      _id: { date },
      references,
    }) => ({
      date: moment.utc(date).format('ddd[, ]D[ de ]MMM[ de ]YYYY').toUpperCase(),
      references: references.map(formatReference),
    })

    const formatDateGroup = dateGroup => ({
      color: dateGroup.total > 0 ? 'success' : 'error',
      total: Math.abs(dateGroup.total).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }),
      category: dateGroup.category,
      dates: dateGroup.dates.map(formatGroups)
    })

    return grouped.map(formatDateGroup)
  }

  const result = await getGrouped()

  res.status(200).json(result)
})

// @desc    Get reference
// @route   GET /api/references/:id
// @access  Private
const getReference = asyncHandler(async (req, res) => {
  const reference = await Reference.findById(req.params.id)
  const account = await Account.findById(reference.account._id)
  const transaction = await Transaction.findById(reference.transaction._id)
  const statement = await Statement.findById(transaction.statement._id)

  if (!reference) {
    res.status(400)
    throw new Error('Referência não encontrada')
  }

  // Check for user
  if (!req.user) {
    res.status(403)
    throw new Error('Usuário não encontrado')
  }

  const { formatter } = ACCOUNT_MAPPER[statement.account]

  res.status(200).json({
    isExternal: account.referenceUser._id.toString() === req.user.id,
    ...formatter(transaction.value, transaction.reference.split(',')),
    account: account.title,
    transactionValue: Math.abs(transaction.value).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }),
    _id: reference._id,
    value: Math.abs(reference.value).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }),
  })
})

// @desc    Set reference
// @route   POST /api/references
// @access  Private
const setReference = asyncHandler(async (req, res) => {
  if (!req.body.transaction || !req.body.value || !req.body.account) {
    res.status(400)
    throw new Error('Por favor adicione uma transação, um valor e uma conta.')
  }

  const reference = await Reference.create({
    transaction: req.body.transaction,
    value: req.body.value,
    account: req.body.account,
  })

  res.status(200).json(reference)
})

// @desc    Update reference
// @route   PUT /api/references/:id
// @access  Private
const updateReference = asyncHandler(async (req, res) => {
  const reference = await Reference.findById(req.params.id)

  if (!reference) {
    res.status(400)
    throw new Error('Transação não encontrada')
  }

  // Check for user
  if (!req.user) {
    res.status(403)
    throw new Error('Usuário não encontrado')
  }

  const updatedReference = await Reference.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedReference)
})

// @desc    Delete reference
// @route   DELETE /api/references/:id
// @access  Private
const deleteReference = asyncHandler(async (req, res) => {
  const reference = await Reference.findById(req.params.id)

  if (!reference) {
    res.status(400)
    throw new Error('Transação não encontrada')
  }

  // Check for user
  if (!req.user) {
    res.status(403)
    throw new Error('Usuário não encontrado')
  }

  await reference.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getReferences,
  getReference,
  setReference,
  updateReference,
  deleteReference,
}