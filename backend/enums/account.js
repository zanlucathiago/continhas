const ACCOUNT_MAPPER = {
  DEFAULT: 'DEFAULT',
  CREDIT_CARD: 'CREDIT_CARD',
}

const CSV_MAPPER = {
  'date,category,title,amount': ACCOUNT_MAPPER.CREDIT_CARD,
  'Data,Valor,Identificador,Descrição': ACCOUNT_MAPPER.DEFAULT
}

const ACCOUNTS = [
  ACCOUNT_MAPPER.DEFAULT,
  ACCOUNT_MAPPER.CREDIT_CARD,
]

module.exports = {
  CSV_MAPPER,
  ACCOUNTS
}