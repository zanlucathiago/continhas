import Savings from '@mui/icons-material/Savings'
import { AlertTitle, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Transaction from '../components/Transaction'
import AuthContext from '../context/AuthContext'
import AccordionGroup from './AccordionGroup'
import DefaultAlert from './DefaultAlert'
import FetchAlert from './FetchAlert'
import FetchSkeleton from './FetchSkeleton'
import TransactionGroup from './TransactionGroup'
import ViewReferenceDrawer from './ViewReferenceDrawer'

const dateReducer = (quantity, dateGroup) =>
  quantity + dateGroup.references.length

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

  const handleChange = () => {
    handleClose()
    setReferences(null)
    fetchReferences()
  }

  return (
    (groups &&
      (groups.length ? (
        groups.map(({ category, dates, total, color }) => (
          <AccordionGroup
            key={category}
            color={color}
            category={category}
            quantity={dates.reduce(dateReducer, 0)}
            total={total}
          >
            <ViewReferenceDrawer
              key={open}
              id={open}
              onClose={handleClose}
              onChange={handleChange}
            />
            {dates.map(({ date, references }) => (
              <TransactionGroup date={date} key={date}>
                {references.map(reference => (
                  <Transaction
                    key={reference._id}
                    icon={reference.icon}
                    onClick={handleOpen(reference._id)}
                    primary={reference.label}
                    isCredit={reference.isCredit}
                  >
                    <Typography variant='body2' noWrap>
                      {reference.secondary}
                    </Typography>
                    <Typography variant='body2'>{reference.value}</Typography>
                  </Transaction>
                ))}
              </TransactionGroup>
            ))}
          </AccordionGroup>
        ))
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
