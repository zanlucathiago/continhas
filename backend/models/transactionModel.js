const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, 'Por favor insira uma data'],
    },
    identifier: {
      type: String,
      unique: [true, 'Extrato já foi importado anteriormente'],
      required: [true, 'Por favor insira um identificador'],
    },
    value: {
      type: Number,
      required: [true, 'Por favor insira um valor'],
    }
  },
  {
    timestamps: true,
  }
)

const TransactionModel = mongoose.model('Transaction', transactionSchema)

TransactionModel.createIndexes()

module.exports = TransactionModel