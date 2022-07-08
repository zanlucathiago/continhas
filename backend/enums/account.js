
const ICON_MAPPER = {
  BAG: 'ShoppingBag',
  CAR: 'DirectionsCar',
  DEFAULT_CARD: 'CreditCard',
  DEFAULT_RECEIVED: 'ArrowDownward',
  HOSPITAL: 'LocalHospital',
  HOUSE: 'House',
  JOYSTICK: 'SportsEsports',
  PENCIL: 'Create',
  SAVED_MONEY: 'Savings',
  PAYMENT_MADE: 'QrCode2',
  SENT_TRANSFER: 'ArrowUpward',
  ACCOUNT_CREDIT: 'KeyboardReturn',
  SUPERMARKET: 'LocalGroceryStore',
  TENNIS: 'SportsTennis',
  TOOL: 'Build',
  DISH: 'DinnerDining',
  BALLS: 'Workspaces',
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

const CATEGORY_MAPPER = {
  casa: {
    secondary: 'Casa',
    icon: ICON_MAPPER.HOUSE,
  },
  vestuário: {
    secondary: 'Vestuário',
    icon: ICON_MAPPER.BAG,
  },
  eletrônicos: {
    secondary: 'Eletrônicos',
    icon: ICON_MAPPER.JOYSTICK,
  },
  transporte: {
    secondary: 'Transporte',
    icon: ICON_MAPPER.CAR,
  },
  serviços: {
    secondary: 'Serviços',
    icon: ICON_MAPPER.TOOL,
  },
  supermercado: {
    secondary: 'Supermercado',
    icon: ICON_MAPPER.SUPERMARKET,
  },
  educação: {
    secondary: 'Educação',
    icon: ICON_MAPPER.PENCIL,
  },
  restaurante: {
    secondary: 'Restaurante',
    icon: ICON_MAPPER.DISH,
  },
  saúde: {
    secondary: 'Saúde',
    icon: ICON_MAPPER.HOSPITAL,
  },
  lazer: {
    secondary: 'Lazer',
    icon: ICON_MAPPER.TENNIS,
  },
  outros: {
    secondary: 'Outros',
    icon: ICON_MAPPER.BALLS,
  },
  "": {
    icon: ICON_MAPPER.DEFAULT_CARD,
  }
}

const ACCOUNT_MAPPER = {
  DEFAULT: {
    descriptionIndex: 3,
    formatter: (value, [, , , description]) => {
      const [primary, secondary] = description.split(' - ');
      return {
        secondary,
        isCredit: value > 0,
        ...(TRANSACTION_MAPPER[primary]),
      }
    },
    key: 'DEFAULT'
  },
  CREDIT_CARD: {
    descriptionIndex: 2,
    formatter: (value, [, category, label]) => ({
      ...(CATEGORY_MAPPER[category]),
      label,
      isCredit: value < 0,
    }),
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