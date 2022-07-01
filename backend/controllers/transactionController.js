const moment = require('moment')
moment.locale('pt-br');
const asyncHandler = require('express-async-handler')

const Transaction = require('../models/transactionModel');
const mongoose = require('mongoose');

const DESCRIPTION_SEPARATOR = ' - ';

const ICON_MAPPER = {
  DEFAULT_CARD: 'CreditCard',
  DEFAULT_RECEIVED: 'ArrowDownward',
  SAVED_MONEY: 'Savings',
  PAYMENT_MADE: 'QrCode2',
  SENT_TRANSFER: 'ArrowUpward',
  ACCOUNT_CREDIT: 'KeyboardReturn',
}

const TRANSACTION_MAPPER = {
  'Compra no débito': {
    label: 'Compra no débito',
    icon: ICON_MAPPER.DEFAULT_CARD
  },
  'Dinheiro guardado com resgate planejado': {
    label: 'Dinheiro guardado',
    icon: ICON_MAPPER.SAVED_MONEY,
  },
  'Pagamento da fatura': {
    label: 'Pagamento da fatura',
    icon: ICON_MAPPER.DEFAULT_CARD
  },
  'Transferência Recebida': {
    label: 'Transferẽncia recebida',
    icon: ICON_MAPPER.DEFAULT_RECEIVED
  },
  'Pagamento de boleto efetuado': {
    label: 'Pagamento efetuado',
    icon: ICON_MAPPER.PAYMENT_MADE
  },
  'Transferência enviada pelo Pix': {
    label: 'Transferência enviada',
    icon: ICON_MAPPER.SENT_TRANSFER,
  },
  'Crédito em conta': {
    label: 'Estorno de débito',
    icon: ICON_MAPPER.ACCOUNT_CREDIT,
  },
  'Depósito Recebido por Boleto': {
    label: 'Depósito recebido',
    icon: ICON_MAPPER.DEFAULT_RECEIVED
  },
  'Transferência recebida pelo Pix': {
    label: 'Transferência recebida',
    icon: ICON_MAPPER.DEFAULT_RECEIVED
  },
}

const formatTransaction = ({ _id, description, value }) => {
  const [primary, secondary] = description.split(DESCRIPTION_SEPARATOR);
  return {
    _id,
    value: Math.abs(value).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }),
    isCredit: value > 0,
    ...(TRANSACTION_MAPPER[primary]),
    secondary,
  }
}

const formatGroups = ({
  _id,
  transactions,
}) => ({
  date: moment.utc(_id).format('ddd[, ]D[ de ]MMM[ de ]YYYY').toUpperCase(),
  transactions: transactions.map(formatTransaction),
})

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
  const grouped = await Transaction.aggregate([{
    $match: {
      user: mongoose.Types.ObjectId(req.user.id),
      account: req.query.account,
    }
  },
  {
    $group: {
      _id: "$date",
      transactions: {
        $push: '$$ROOT',
      },
    },
  }, {
    $sort: {
      _id: -1,
    },
  }])

  res.status(200).json(grouped.map(formatGroups))
})

// @desc    Set transaction
// @route   POST /api/transactions
// @access  Private
const setTransaction = asyncHandler(async (req, res) => {
  if (!req.body.description) {
    res.status(400)
    throw new Error('Por favor adicione uma descrição')
  }

  const transaction = await Transaction.create({
    description: req.body.description,
    user: req.user.id,
  })

  res.status(200).json(transaction)
})

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id)

  if (!transaction) {
    res.status(400)
    throw new Error('Transação não encontrada')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('Usuário não encontrado')
  }

  // Make sure the logged in user matches the transaction user
  if (transaction.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Usuário não autorizado')
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedTransaction)
})

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id)

  if (!transaction) {
    res.status(400)
    throw new Error('Transação não encontrada')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('Usuário não encontrado')
  }

  // Make sure the logged in user matches the transaction user
  if (transaction.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Usuário não autorizado')
  }

  await transaction.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getTransactions,
  setTransaction,
  updateTransaction,
  deleteTransaction,
}