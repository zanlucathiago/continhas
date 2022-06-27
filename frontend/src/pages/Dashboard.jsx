import SaveIcon from '@mui/icons-material/Save'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { useEffect, useState } from 'react'
import { Box, Drawer, List, ListItem, ListItemButton, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import transactionService from '../features/transaction/transactionService'

export default function Dashboard() {
  const [openTransaction, setOpenTransaction] = useState(null)
  const [transactions, setTransactions] = useState(null)
  const [saving, setSaving] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [description, setDescription] = useState('')

  const handleClick = () => {
    setSaving(true)
    transactionService.createTransaction({ description }).then(() => {
      setSaving(false)
      setDrawerOpen(false)
      setTransactions(null)
      fetchTransactions()
    })
    // setTimeout(() => {
    //   setSaving(false)
    //   setDrawerOpen(false)
    // }, 1414)
  }

  const fetchTransactions = () => {
    transactionService.getTransactions().then(setTransactions)
  }

  useEffect(() => {
    fetchTransactions()
    // return () => {
    //   setTransactions(null)
    // }
  }, [])

  const toggleDrawer = open => event => {
    // if (
    //   event.type === 'keydown' &&
    //   (event.key === 'Tab' || event.key === 'Shift')
    // ) {
    //   return
    // }

    setDrawerOpen(open)
  }

  const handleChange = ({ target: { value } }) => {
    setDescription(value)
  }

  const viewTransaction = (transaction) => () => {
    setOpenTransaction(transaction)
  }

  return (
    <>
      {transactions && (
        <List>
          {transactions.map(transaction => (
            <ListItem>
              <ListItemButton onClick={viewTransaction(transaction)}>
                {transaction.description}
              </ListItemButton>
            </ListItem>
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
      >
        <AddIcon />
      </Fab>
      <Drawer anchor='bottom' open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 'auto' }}
          role='presentation'
          // onClick={toggleDrawer(false)}
          // onKeyDown={toggleDrawer(false)}
        >
          <TextField
            label='Nova despesa'
            onChange={handleChange}
            value={description}
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
        </Box>
      </Drawer>
    </>
  )
}
