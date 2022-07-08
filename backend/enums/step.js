const STEP_MAPPER = {
  FULL: {
    key: 'FULL',
    value: 1,
  },
  HALF: {
    key: 'HALF',
    value: 1 / 2,
  },
  SQUARE: {
    key: 'SQUARE',
    value: Math.sqrt(2) / 2,
  },
  INVERSE_SQUARE: {
    key: 'INVERSE_SQUARE',
    value: (2 - Math.sqrt(2)) / 2,
  },
  SQUARE_HALF: {
    key: 'SQUARE_HALF',
    value: 2 - Math.sqrt(2),
  },
  INVERSE_SQUARE_HALF: {
    key: 'INVERSE_SQUARE_HALF',
    value: Math.sqrt(2) - 1,
  },
}

const STEPS = [
  STEP_MAPPER.FULL.key,
  STEP_MAPPER.HALF.key,
  STEP_MAPPER.SQUARE.key,
  STEP_MAPPER.INVERSE_SQUARE.key,
  STEP_MAPPER.SQUARE_HALF.key,
  STEP_MAPPER.INVERSE_SQUARE_HALF.key,
]

module.exports = {
  STEPS,
}