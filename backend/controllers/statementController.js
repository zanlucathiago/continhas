const asyncHandler = require('express-async-handler');
const { CSV_MAPPER } = require('../enums/account');

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

  const parseTransaction = text => {
    const [date, value, , description] = text.split(',')
    return {
      date: new Date(date.split('/').reverse().join('-')),
      value,
      description,
      user: req.user.id,
      account,
      reference: text,
    }
  }

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