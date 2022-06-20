const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Por favor adicione uma descrição'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Transaction', transactionSchema)