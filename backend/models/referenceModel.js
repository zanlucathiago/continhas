const mongoose = require('mongoose')

const referenceSchema = mongoose.Schema(
  {
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Transaction',
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Account',
    },
    value: {
      type: Number,
      required: [true, 'Por favor insira um valor'],
    },
    confirmed: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
)

const ReferenceModel = mongoose.model('Reference', referenceSchema)

module.exports = ReferenceModel