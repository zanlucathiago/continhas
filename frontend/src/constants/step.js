export const VALUE_MAPPER = {
  FULL: 142,
  HALF: 71,
  SQUARE: 100,
  INVERSE_SQUARE: 42,
  SQUARE_HALF: 83,
  INVERSE_SQUARE_HALF: 59
}

export const MARK_MAPPER = {
  '142': {
    key: 'FULL',
    value: 1
  },
  '71': {
    key: 'HALF',
    value: 1 / 2
  },
  '100': {
    key: 'SQUARE',
    value: Math.sqrt(2) / 2
  },
  '42': {
    key: 'INVERSE_SQUARE',
    value: (2 - Math.sqrt(2)) / 2
  },
  '83': {
    key: 'SQUARE_HALF',
    value: 2 - Math.sqrt(2)
  },
  '59': {
    key: 'INVERSE_SQUARE_HALF',
    value: Math.sqrt(2) - 1
  }
}

export const marks = [
  {
    value: VALUE_MAPPER.INVERSE_SQUARE
  },
  {
    value: VALUE_MAPPER.INVERSE_SQUARE_HALF
  },
  {
    value: VALUE_MAPPER.HALF
  },
  {
    value: VALUE_MAPPER.SQUARE_HALF
  },
  {
    value: VALUE_MAPPER.SQUARE
  },
  {
    value: VALUE_MAPPER.FULL
  }
]
