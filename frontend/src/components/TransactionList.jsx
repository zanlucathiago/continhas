import Savings from '@mui/icons-material/Savings'
import { AlertTitle, List } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Transaction from '../components/Transaction'
import AuthContext from '../context/AuthContext'
import AlertUploadButton from './AlertUploadButton'
import DefaultAlert from './DefaultAlert'
import FetchAlert from './FetchAlert'
import FetchSkeleton from './FetchSkeleton'
import TransactionGroup from './TransactionGroup'
import UploadButton from './UploadButton'

export default function TransactionList ({
  account,
  onChangeAccount,
  onAddTab
}) {
  const [alert, setAlert] = useState(null)

  const { getTransactions } = useContext(AuthContext)

  const [groups, setTransactions] = useState(null)

  const fetchTransactions = () => {
    getTransactions(account)
      .then(setTransactions)
      .catch(handleCatch)
  }

  const handleCatch = ({ message }) => {
    setAlert(message)
  }

  useEffect(fetchTransactions, [])

  const handleClick = () => {
    setAlert(null)
    fetchTransactions()
  }

  const handleUpload = statementAccount => {
    if (statementAccount === account) {
      setTransactions(null)
      fetchTransactions()
    } else {
      onChangeAccount(statementAccount)
    }
  }

  return (
    <>
      {(groups &&
        (groups.length ? (
          <List
            dense
            subheader={<li />}
            sx={{
              '& ul': { padding: 0 },
              '& li': { padding: 0 }
            }}
          >
            {groups.map(({ date, transactions }) => (
              <TransactionGroup date={date} key={date}>
                {transactions.map(
                  ({ icon, label, secondary, value, _id, isCredit }) => (
                    <Transaction
                      key={_id}
                      _id={_id}
                      icon={icon}
                      onAddTab={onAddTab}
                      primary={label}
                      secondary={secondary}
                      total={value}
                      isCredit={isCredit}
                    />
                  )
                )}
              </TransactionGroup>
            ))}
          </List>
        ) : (
          <DefaultAlert
            action={
              <AlertUploadButton color='inherit' onUpload={handleUpload} />
            }
            Icon={Savings}
            severity='info'
          >
            <AlertTitle>Sem continhas ainda</AlertTitle>Importe seu extrato e
            tenha o controle do seu dinheiro.
          </DefaultAlert>
        ))) ||
        (alert ? (
          <FetchAlert onClick={handleClick}>{alert}</FetchAlert>
        ) : (
          <FetchSkeleton />
        ))}
      <UploadButton onUpload={handleUpload} />
    </>
  )
}
