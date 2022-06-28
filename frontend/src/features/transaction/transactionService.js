import axios from 'axios'

axios.interceptors.request.use(async (config) => new Promise(resolve => setTimeout(() => resolve(config), Math.random() * 4000)))

const API_URL = '/api/transactions/'

// Create new transaction
const createTransaction = (token) => (transactionData) => axios.post(API_URL, transactionData, getConfig(token)).then(({ data }) => data)

// Get user transactions
const getTransactions = (token) => () => axios.get(API_URL, getConfig(token)).then(({ data }) => data)

// Delete user transaction
const deleteTransaction = (token) => (transactionId) => axios.delete(API_URL + transactionId, getConfig(token)).then(({ data }) => data)

// Update user transaction
const updateTransaction = (token) => (transactionId, transactionData) => axios.put(API_URL + transactionId, transactionData, getConfig(token)).then(({ data }) => data)

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