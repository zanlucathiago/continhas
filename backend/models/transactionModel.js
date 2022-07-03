const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    statement: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Statement',
    },
    date: {
      type: Date,
      required: [true, 'Por favor insira uma data'],
    },
    value: {
      type: Number,
      required: [true, 'Por favor insira um valor'],
    },
  },
  {
    timestamps: true,
  }
)

const TransactionModel = mongoose.model('Transaction', transactionSchema)

module.exports = TransactionModel