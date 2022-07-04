const moment = require('moment')
moment.locale('pt-br');
const asyncHandler = require('../middleware/asyncMiddleware');

const Reference = require('../models/referenceModel');
const { ACCOUNT_MAPPER } = require('../enums/account');
const Statement = require('../models/statementModel');

// @desc    Get references
// @route   GET /api/references
// @access  Private
const getReferences = asyncHandler(async (req, res) => {
  const statement = await Statement.findOne({
    account: req.query.account,
    user: req.user.id
  })

  const getGrouped = async () => {
    if (statement) {
      const grouped = await Reference.aggregate([
        {
          $match: { statement: statement._id }
        },
        {
          $group: { _id: "$date", references: { $push: '$$ROOT' } },
        },
        {
          $sort: { _id: -1 },
        }])
      const { formatter } = ACCOUNT_MAPPER[req.query.account]

      const formatReference = ({ reference, _id, value }) => ({
        ...formatter(value, reference.split(',')),
        _id,
        value: Math.abs(value).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
      })

      const formatGroups = ({
        _id,
        references,
      }) => ({
        date: moment.utc(_id).format('ddd[, ]D[ de ]MMM[ de ]YYYY').toUpperCase(),
        references: references.map(formatReference),
      })

      return grouped.map(formatGroups)
    }

    return []
  }
  const result = await getGrouped()
  res.status(200).json(result)
})

// @desc    Get reference
// @route   GET /api/references/:id
// @access  Private
const getReference = asyncHandler(async (req, res) => {
  const reference = await Reference.findById(req.params.id)
  const statement = await Statement.findById(reference.statement._id)

  if (!reference) {
    res.status(400)
    throw new Error('Transação não encontrada')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('Usuário não encontrado')
  }

  // Make sure the logged in user matches the reference user
  if (statement.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Usuário não autorizado')
  }

  res.status(200).json({
    reports: [],
    rawValue: Math.abs(reference.value),
    date: moment.utc(reference.date).format('ddd[, ]D[ de ]MMM[ de ]YYYY'),
    description: reference.reference.split(',')[ACCOUNT_MAPPER[statement.account].descriptionIndex].split(' - ').join('\n'),
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
    res.status(401)
    throw new Error('Usuário não encontrado')
  }

  // Make sure the logged in user matches the reference user
  if (reference.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Usuário não autorizado')
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
    res.status(401)
    throw new Error('Usuário não encontrado')
  }

  // Make sure the logged in user matches the reference user
  if (reference.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Usuário não autorizado')
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