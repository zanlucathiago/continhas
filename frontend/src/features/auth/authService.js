import axios from 'axios'

axios.interceptors.response.use(async (config) => new Promise(resolve => setTimeout(() => resolve(config), Math.random() * 4000)))

const API_URL = '/api/users/'

// Register user
const register = (userData) => axios.post(API_URL, userData).then(({ data }) => data)

// Login user
const login = (userData) => axios.post(API_URL + 'login', userData).then(({ data }) => data)

const authService = {
  register,
  login,
}

export default authService