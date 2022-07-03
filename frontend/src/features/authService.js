import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = (userData) => axios.post(API_URL, userData)

// Login user
const login = (userData) => axios.post(API_URL + 'login', userData)

const authService = {
  register,
  login,
}

export default authService