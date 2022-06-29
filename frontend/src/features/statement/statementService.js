import axios from 'axios'

axios.interceptors.response.use(async (config) => new Promise(resolve => setTimeout(() => resolve(config), Math.random() * 4000)))

const API_URL = '/api/statements/'

// Create new statement
const createStatement = (token) => (text) => axios.post(API_URL, { text }, getConfig(token)).then(({ data }) => data)

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const statementService = {
  createStatement
}

export default statementService