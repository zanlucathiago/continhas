const { CSV_MAPPER } = require('../enums/account');
const asyncHandler = require('../middleware/asyncMiddleware');

const Transaction = require('../models/transactionModel')

// @desc    Set statement
// @route   POST /api/statements
// @access  Private
const setStatement = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Por favor envie o arquivo')
  }

  const [header, ...rawTransactions] = req.body.text.split('\n');

  const account = CSV_MAPPER[header]

  if (!account) {
    res.status(400)
    throw new Error('Conteúdo do arquivo não suportado')
  }

  const { mapper, key } = account

  const parseTransaction = text =>
  ({
    ...mapper(text.split(',')),
    user: req.user.id,
    account: key,
    reference: text,
  })

  const transactions = await Transaction.insertMany(rawTransactions.filter(Boolean).map(parseTransaction)).catch(error => {
    console.error(error)
    res.status(400)
    throw new Error('Erro desconhecido ao importar os dados')
  })

  res.status(200).json(transactions)
})

module.exports = {
  setStatement,
}