const express = require('express')
const router = express.Router()
const {
  getReferences,
  setReference,
  updateReference,
  deleteReference,
  getReference,
} = require('../controllers/referenceController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getReferences).post(protect, setReference)
router.route('/:id').get(protect, getReference).delete(protect, deleteReference).put(protect, updateReference)

module.exports = router