const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'lalala' })
})

router.post('/', (req, res) => {
  res.status(200).json({ message: 'lalala' })
})

router.put('/:id', (req, res) => {
  res.status(200).json({ message: 'lalala' })
})

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'lalala' })
})

module.exports = router