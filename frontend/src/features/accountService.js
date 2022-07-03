import axios from 'axios'

const API_URL = '/api/accounts/'

// Create new account
const createAccount = (token) => (accountData) => axios.post(API_URL, accountData, getConfig(token))

// Get user accounts
const getAccounts = (token) => (account) => axios.get(API_URL, { ...getConfig(token), params: { account } })

// Delete user account
const deleteAccount = (token) => (accountId) => axios.delete(API_URL + accountId, getConfig(token))

// Update user account
const updateAccount = (token) => (accountId, accountData) => axios.put(API_URL + accountId, accountData, getConfig(token))

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const accountService = {
  createAccount,
  getAccounts,
  deleteAccount,
  updateAccount,
}

export default accountService