import Savings from '@mui/icons-material/Savings'
import { AlertTitle, List } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Transaction from '../components/Transaction'
import AuthContext from '../context/AuthContext'
import DefaultAlert from './DefaultAlert'
import FetchAlert from './FetchAlert'
import FetchSkeleton from './FetchSkeleton'
import TransactionGroup from './TransactionGroup'
import ViewReferenceDrawer from './ViewReferenceDrawer'

export default function ReferenceList ({ account }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = id => () => {
    setOpen(id)
  }

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

  const handleDelete = () => {
    setReferences(null)
    fetchReferences()
  }

  return (
    (groups &&
      (groups.length ? (
        <List
          dense
          subheader={<li />}
          sx={{
            '& ul': { padding: 0 },
            '& li': { padding: 0 }
          }}
        >
          <ViewReferenceDrawer
            key={open}
            id={open}
            onClose={handleClose}
            onDelete={handleDelete}
          />
          {groups.map(({ date, references }) => (
            <TransactionGroup date={date} key={date}>
              {references.map(
                ({ icon, label, secondary, value, _id, isCredit }) => (
                  <Transaction
                    key={_id}
                    icon={icon}
                    onClick={handleOpen(_id)}
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
          <AlertTitle>Sem continhas ainda</AlertTitle>Crie uma referência em uma
          continha e faça o controle por aqui.
        </DefaultAlert>
      ))) ||
    (alert ? (
      <FetchAlert onClick={handleClick}>{alert}</FetchAlert>
    ) : (
      <FetchSkeleton />
    ))
  )
}
