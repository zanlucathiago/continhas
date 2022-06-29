import { useContext, useEffect, useState } from 'react'
import { Box, List, Skeleton } from '@mui/material'
import Transaction from '../components/Transaction'
import AuthContext from '../context/AuthContext'
import TransactionGroup from './TransactionGroup'

export default function TransactionList () {
  const { getTransactions } = useContext(AuthContext)
  const [groups, setTransactions] = useState(null)

  const fetchTransactions = () => {
    getTransactions().then(setTransactions)
  }

  useEffect(fetchTransactions)

  const handleDelete = _id => () => {
    setTransactions(groups.filter(isNot(_id)))
  }

  const isNot = _id => transaction => transaction._id !== _id

  return (
    <Box sx={{ p: 2 }}>
      {groups ? (
        <List
          dense
          subheader={<li />}
          sx={{
            '& ul': { padding: 0 },
            '& li': { padding: 0 }
          }}
        >
          {groups.map(({ date, transactions }) => (
            <TransactionGroup date={date}>
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
        Array(4)
          .fill()
          .map((_item, index) => <Skeleton height={41} key={index} />)
      )}
    </Box>
  )
}
