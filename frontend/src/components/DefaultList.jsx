import ReferenceList from './ReferenceList'
import TransactionList from './TransactionList'

const ADD_ACCOUNT = 'CREDIT_CARD'

const DEFAULT_ACCOUNT = 'DEFAULT'

const ACCOUNT_TABS = [ADD_ACCOUNT, DEFAULT_ACCOUNT]

export default function DefaultList ({ account, onAddTab, onChangeAccount }) {
  return ACCOUNT_TABS.includes(account) ? (
    <TransactionList
      key={account}
      account={account}
      onAddTab={onAddTab}
      onChangeAccount={onChangeAccount}
    />
  ) : (
    <ReferenceList key={account} account={account} />
  )
}
