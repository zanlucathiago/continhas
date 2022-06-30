import axios from 'axios'

const API_URL = '/api/statements/'

// Create new statement
const createStatement = (token) => (text) => axios.post(API_URL, { text }, getConfig(token))

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const statementService = {
  createStatement
}

export default statementService