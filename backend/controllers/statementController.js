const { CSV_MAPPER } = require('../enums/account');
const asyncHandler = require('../middleware/asyncMiddleware');
const Transaction = require('../models/transactionModel')
const Statement = require('../models/statementModel')

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
    throw new Error('A importação falhou porque contém um arquivo inválido')
  }

  const { mapper, key } = account

  const parseTransaction = text =>
  ({
    ...mapper(text.split(',')),
    reference: text,
  })

  const parsedTransactions = rawTransactions.filter(Boolean).map(parseTransaction);

  // Check if statement was previously uploaded
  const dateList = parsedTransactions.map(({ date }) => date)
  const minDate = dateList.reduce((m, e) => e < m ? e : m)
  const maxDate = dateList.reduce((m, e) => e > m ? e : m)

  const found = await Statement.findOne({
    user: req.user.id,
    account: key,
    $and: [
      {
        min: {
          $lte: maxDate
        }
      },
      {
        max: {
          $gte: minDate
        }
      },
    ]
  })
  if (found) {
    res.status(400)
    throw new Error('A importação falhou porque o extrato já consta na base')
  }

  const statement = await Statement.create({
    reference: req.body.text,
    user: req.user.id,
    account: key,
    min: minDate,
    max: maxDate
  })

  await Transaction.insertMany(parsedTransactions.map(transaction => ({ ...transaction, statement })))

  res.status(200).json(statement)
})

module.exports = {
  setStatement,
}