import SaveIcon from '@mui/icons-material/Save'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { useEffect, useRef, useState } from 'react'
import { Box, Drawer, List, Stack, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import transactionService from '../features/transaction/transactionService'
import Transaction from '../components/Transaction'

export default function Dashboard () {
  const drawerInput = useRef()
  const [transactions, setTransactions] = useState(null)
  const [saving, setSaving] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [newDescription, setNewDescription] = useState('')

  const handleClick = () => {
    setSaving(true)
    transactionService
      .createTransaction({ description: newDescription })
      .then(() => {
        setSaving(false)
        setDrawerOpen(false)
        setTransactions(null)
        fetchTransactions()
      })
  }

  const fetchTransactions = () => {
    transactionService.getTransactions().then(setTransactions)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

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
      {transactions && (
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
        <Box sx={{ width: 'auto', p: 2 }} role='presentation'>
          <Stack spacing={2}>
            <TextField
              label='Nova despesa'
              onChange={handleChange}
              inputRef={drawerInput}
            />
            <LoadingButton
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
