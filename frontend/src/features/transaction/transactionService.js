import axios from 'axios'

const API_URL = '/api/transactions/'

// Create new transaction
const createTransaction = (token) => (transactionData) => axios.post(API_URL, transactionData, getConfig(token))

// Get user transactions
const getTransactions = (token) => () => axios.get(API_URL, getConfig(token))

// Delete user transaction
const deleteTransaction = (token) => (transactionId) => axios.delete(API_URL + transactionId, getConfig(token))

// Update user transaction
const updateTransaction = (token) => (transactionId, transactionData) => axios.put(API_URL + transactionId, transactionData, getConfig(token))

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const transactionService = {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
}

export default transactionService