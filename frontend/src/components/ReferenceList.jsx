import Savings from '@mui/icons-material/Savings'
import { AlertTitle, List } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Transaction from '../components/Transaction'
import AuthContext from '../context/AuthContext'
import DefaultAlert from './DefaultAlert'
import FetchAlert from './FetchAlert'
import FetchSkeleton from './FetchSkeleton'
import TransactionGroup from './TransactionGroup'

export default function ReferenceList ({ account, onAddTab }) {
  const [alert, setAlert] = useState(null)

  const { getReferences } = useContext(AuthContext)

  const [groups, setReferences] = useState(null)

  const fetchReferences = () => {
    getReferences(account)
      .then(setReferences)
      .catch(handleCatch)
  }

  const handleCatch = ({ message }) => {
    setAlert(message)
  }

  useEffect(fetchReferences, [])

  const handleClick = () => {
    setAlert(null)
    fetchReferences()
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
            {groups.map(({ date, references }) => (
              <TransactionGroup date={date} key={date}>
                {references.map(
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
          <DefaultAlert Icon={Savings} severity='info'>
            <AlertTitle>Sem continhas ainda</AlertTitle>Crie uma referência em
            uma continha e faça o controle por aqui.
          </DefaultAlert>
        ))) ||
        (alert ? (
          <FetchAlert onClick={handleClick}>{alert}</FetchAlert>
        ) : (
          <FetchSkeleton />
        ))}
    </>
  )
}
