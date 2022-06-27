import axios from 'axios'

axios.interceptors.request.use(async (config) => new Promise(resolve => setTimeout(() => resolve(config), Math.random() * 8000)))

const getToken = () => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'))
  return user.token;
}

const API_URL = '/api/transactions/'

// Create new transaction
const createTransaction = async (transactionData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }

  const response = await axios.post(API_URL, transactionData, config)

  return response.data
}

// Get user transactions
const getTransactions = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user transaction
const deleteTransaction = async (transactionId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }

  const response = await axios.delete(API_URL + transactionId, config)

  return response.data
}

// Update user transaction
const updateTransaction = async (transactionId, transactionData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }

  const response = await axios.put(API_URL + transactionId, transactionData, config)

  return response.data
}

const transactionService = {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
}

export default transactionService