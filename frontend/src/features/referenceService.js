import axios from 'axios'

const API_URL = '/api/references/'

// Create new reference
const createReference = (token) => (referenceData) => axios.post(API_URL, referenceData, getConfig(token))

// Get user references
const getReferences = (token) => (account) => axios.get(API_URL, { ...getConfig(token), params: { account } })

// Get user references
const getReference = (token) => (referenceId) => axios.get(API_URL + referenceId, getConfig(token))

// Delete user reference
const deleteReference = (token) => (referenceId) => axios.delete(API_URL + referenceId, getConfig(token))

// Update user reference
const updateReference = (token) => (referenceId, referenceData) => axios.put(API_URL + referenceId, referenceData, getConfig(token))

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const referenceService = {
  createReference,
  getReferences,
  getReference,
  deleteReference,
  updateReference,
}

export default referenceService