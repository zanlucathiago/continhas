const ACCOUNT_MAPPER = {
  DEFAULT: 'DEFAULT',
  CREDIT_CARD: 'CREDIT_CARD',
}

const CSV_MAPPER = {
  'date,category,title,amount': {
    key: ACCOUNT_MAPPER.CREDIT_CARD,
    mapper: ([date, , , value]) => ({
      date,
      value,
    })
  },
  'Data,Valor,Identificador,Descrição': {
    key: ACCOUNT_MAPPER.DEFAULT,
    mapper: ([date, value]) => ({
      date: new Date(date.split('/').reverse().join('-')),
      value,
    })
  }
}

const ACCOUNTS = [
  ACCOUNT_MAPPER.DEFAULT,
  ACCOUNT_MAPPER.CREDIT_CARD,
]

module.exports = {
  CSV_MAPPER,
  ACCOUNTS
}