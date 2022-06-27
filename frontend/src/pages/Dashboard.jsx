import AccountCircle from '@mui/icons-material/AccountCircle'
import SaveIcon from '@mui/icons-material/Save'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { useEffect, useRef, useState } from 'react'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  TextField,
  Toolbar,
  Typography
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import transactionService from '../features/transaction/transactionService'
import Transaction from '../components/Transaction'
import authService from '../features/auth/authService'

export default function Dashboard () {
  const [anchorEl, setAnchorEl] = useState(null)
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
    transactionService.getTransactions().then(setTransactions)
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

  const handleMenu = ({ currentTarget }) => {
    setAnchorEl(currentTarget)
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            Continhas
          </Typography>
          <IconButton onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorEl)}
          >
            <MenuItem onClick={authService.logout}>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
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
