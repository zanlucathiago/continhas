
const ICON_MAPPER = {
  DEFAULT_CARD: 'CreditCard',
  DEFAULT_RECEIVED: 'ArrowDownward',
  SAVED_MONEY: 'Savings',
  PAYMENT_MADE: 'QrCode2',
  SENT_TRANSFER: 'ArrowUpward',
  ACCOUNT_CREDIT: 'KeyboardReturn',
}

const TRANSACTION_MAPPER = {
  'Compra no débito': {
    label: 'Compra no débito',
    icon: ICON_MAPPER.DEFAULT_CARD
  },
  'Dinheiro guardado com resgate planejado': {
    label: 'Dinheiro guardado',
    icon: ICON_MAPPER.SAVED_MONEY,
  },
  'Pagamento da fatura': {
    label: 'Pagamento da fatura',
    icon: ICON_MAPPER.DEFAULT_CARD
  },
  'Transferência Recebida': {
    label: 'Transferẽncia recebida',
    icon: ICON_MAPPER.DEFAULT_RECEIVED
  },
  'Pagamento de boleto efetuado': {
    label: 'Pagamento efetuado',
    icon: ICON_MAPPER.PAYMENT_MADE
  },
  'Transferência enviada pelo Pix': {
    label: 'Transferência enviada',
    icon: ICON_MAPPER.SENT_TRANSFER,
  },
  'Crédito em conta': {
    label: 'Estorno de débito',
    icon: ICON_MAPPER.ACCOUNT_CREDIT,
  },
  'Depósito Recebido por Boleto': {
    label: 'Depósito recebido',
    icon: ICON_MAPPER.DEFAULT_RECEIVED
  },
  'Transferência recebida pelo Pix': {
    label: 'Transferência recebida',
    icon: ICON_MAPPER.DEFAULT_RECEIVED
  },
}

const ACCOUNT_MAPPER = {
  DEFAULT: {
    formatter: ([, , , description]) => {
      const [primary, secondary] = description.split(' - ');
      return {
        ...(TRANSACTION_MAPPER[primary]),
        secondary,
      }

    },
    key: 'DEFAULT'
  },
  CREDIT_CARD: {
    formatter: ([]) => ({}),
    key: 'CREDIT_CARD'
  },
}

const CSV_MAPPER = {
  'date,category,title,amount': {
    key: ACCOUNT_MAPPER.CREDIT_CARD.key,
    mapper: ([date, , , value]) => ({
      date,
      value,
    })
  },
  'Data,Valor,Identificador,Descrição': {
    key: ACCOUNT_MAPPER.DEFAULT.key,
    mapper: ([date, value]) => ({
      date: new Date(date.split('/').reverse().join('-')),
      value,
    })
  }
}

const ACCOUNTS = [
  ACCOUNT_MAPPER.DEFAULT.key,
  ACCOUNT_MAPPER.CREDIT_CARD.key,
]

module.exports = {
  CSV_MAPPER,
  ACCOUNTS,
  ACCOUNT_MAPPER,
}