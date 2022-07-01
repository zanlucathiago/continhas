const mongoose = require('mongoose')
const { ACCOUNTS } = require('../enums/account')

const transactionSchema = mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    account: {
      type: String,
      enum: ACCOUNTS,
    },
    date: {
      type: Date,
      required: [true, 'Por favor insira uma data'],
    },
    value: {
      type: Number,
      required: [true, 'Por favor insira um valor'],
    },
    description: {
      type: String,
      required: [true, 'Por favor insira uma descrição'],
    },
  },
  {
    timestamps: true,
  }
)

const TransactionModel = mongoose.model('Transaction', transactionSchema)

TransactionModel.createIndexes()

module.exports = TransactionModel