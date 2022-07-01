import Savings from '@mui/icons-material/Savings'
import { Alert, AlertTitle, Button, List, Skeleton } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Transaction from '../components/Transaction'
import AuthContext from '../context/AuthContext'
import TransactionGroup from './TransactionGroup'

const isNot = _id => transaction => transaction._id !== _id

export default function TransactionList ({ account }) {
  const [alert, setAlert] = useState(false)

  const { getTransactions } = useContext(AuthContext)

  const [groups, setTransactions] = useState(null)

  const fetchTransactions = () => {
    getTransactions(account)
      .then(setTransactions)
      .catch(handleCatch)
  }

  const handleCatch = () => {
    setAlert(true)
  }

  useEffect(fetchTransactions, [])

  const handleDelete = _id => () => {
    setTransactions(groups.filter(isNot(_id)))
  }

  const handleClick = () => {
    setAlert(null)
    fetchTransactions()
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
                      primary={label}
                      secondary={secondary}
                      total={value}
                      onDelete={handleDelete(_id)}
                      isCredit={isCredit}
                    />
                  )
                )}
              </TransactionGroup>
            ))}
          </List>
        ) : (
          <Alert
            icon={<Savings fontSize='large' />}
            severity='info'
            style={{
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center'
            }}
          >
            <AlertTitle>Sem continhas ainda</AlertTitle>Importe seu extrato e
            tenha o controle do seu dinheiro.
          </Alert>
        ))) ||
        (alert ? (
          <Alert
            action={
              <Button color='inherit' onClick={handleClick}>
                Repetir
              </Button>
            }
            severity='error'
            style={{ alignItems: 'center', flexDirection: 'column' }}
          >
            <AlertTitle>Algo errado aconteceu</AlertTitle>
            Por favor tente novamente
          </Alert>
        ) : (
          Array(4)
            .fill()
            .map((_item, index) => <Skeleton height={41} key={index} />)
        ))}
    </>
  )
}
