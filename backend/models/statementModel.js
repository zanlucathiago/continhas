const mongoose = require('mongoose')
const { ACCOUNTS } = require('../enums/account')

const statementSchema = mongoose.Schema(
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
    min: {
      type: Date,
      required: [true, 'Por favor insira uma data inicial'],
    },
    max: {
      type: Date,
      required: [true, 'Por favor insira uma data final'],
    },
  },
  {
    timestamps: true,
  }
)

const StatementModel = mongoose.model('Statement', statementSchema)

// StatementModel.createIndexes()

module.exports = StatementModel