const mongoose = require('mongoose')

const accountSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title value'],
    },
    referenceUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Account', accountSchema)