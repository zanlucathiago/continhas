import SaveIcon from '@mui/icons-material/Save'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { useContext, useEffect, useRef, useState } from 'react'
import { Box, Drawer, List, Skeleton, Stack, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import transactionService from '../features/transaction/transactionService'
import Transaction from '../components/Transaction'
import AuthContext from '../context/AuthContext'

export default function Dashboard () {
  const { getTransactions } = useContext(AuthContext)
  const drawerInput = useRef()
  const [transactions, setTransactions] = useState(null)
  const [saving, setSaving] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [newDescription, setNewDescription] = useState('')

  const handleClick = () => {
    setSaving(true)
    transactionService
      .createTransaction({ description: newDescription })
      .then(onCreate)
      .catch(stopSaving)
  }

  const stopSaving = () => {
    setSaving(false)
  }

  const onCreate = () => {
    setNewDescription('')
    setSaving(false)
    setDrawerOpen(false)
    setTransactions(null)
    fetchTransactions()
  }

  const fetchTransactions = () => {
    getTransactions().then(setTransactions)
  }

  useEffect(fetchTransactions, [])

  const toggleDrawer = open => () => {
    setDrawerOpen(open)
  }

  const handleChange = ({ target: { value } }) => {
    setNewDescription(value)
  }

  const handleFocus = () => {
    drawerInput.current?.focus()
  }

  const handleDelete = _id => () => {
    setTransactions(transactions.filter(isNot(_id)))
  }

  const isNot = _id => transaction => transaction._id !== _id

  return (
    <>
      {transactions ? (
        <List>
          {transactions.map(({ _id, description }) => (
            <Transaction
              key={_id}
              _id={_id}
              defaultDescription={description}
              onDelete={handleDelete(_id)}
            />
          ))}
        </List>
      ) : (
        Array(4).fill(<Skeleton height={41} />)
      )}
      <Fab
        color='primary'
        onClick={toggleDrawer(true)}
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translate(-50%, 0)'
        }}
        onFocus={handleFocus}
      >
        <AddIcon />
      </Fab>
      <Drawer anchor='bottom' open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box component='form' sx={{ width: 'auto', p: 2 }} role='presentation'>
          <Stack spacing={2}>
            <TextField
              label='Nova despesa'
              onChange={handleChange}
              inputRef={drawerInput}
            />
            <LoadingButton
              disabled={Boolean(!newDescription)}
              onClick={handleClick}
              loading={saving}
              loadingPosition='start'
              startIcon={<SaveIcon />}
              variant='contained'
            >
              Salvar
            </LoadingButton>
          </Stack>
        </Box>
      </Drawer>
    </>
  )
}
