import FileUploadIcon from '@mui/icons-material/FileUpload'
import SaveIcon from '@mui/icons-material/Save'
import Fab from '@mui/material/Fab'
import { useContext, useEffect, useRef, useState } from 'react'
import {
  Box,
  Drawer,
  Input,
  List,
  Skeleton,
  Stack,
  TextField
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import Transaction from '../components/Transaction'
import AuthContext from '../context/AuthContext'
import TransactionGroup from './TransactionGroup'

export default function Dashboard () {
  const uploadInput = useRef()
  const { createStatement, createTransaction, getTransactions } = useContext(
    AuthContext
  )
  const drawerInput = useRef()
  const [groups, setTransactions] = useState(null)
  const [saving, setSaving] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [newDescription, setNewDescription] = useState('')

  const handleClick = () => {
    setSaving(true)
    createTransaction({ description: newDescription })
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

  useEffect(fetchTransactions)

  const toggleDrawer = open => () => {
    setDrawerOpen(open)
  }

  const handleChange = ({ target: { value } }) => {
    setNewDescription(value)
  }

  const handleDelete = _id => () => {
    setTransactions(groups.filter(isNot(_id)))
  }

  const isNot = _id => transaction => transaction._id !== _id

  const handleClickUpload = () => {
    uploadInput.current.click()
  }

  const handleChangeUpload = ({
    target: {
      files: [file]
    }
  }) => {
    if (file) {
      file.text().then(createStatement)
    }
  }

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
      <Fab
        color='primary'
        onClick={handleClickUpload}
        style={{
          position: 'fixed',
          bottom: 16,
          left: '50%',
          transform: 'translate(-50%, 0)'
        }}
      >
        <FileUploadIcon />
        <Input
          accept='text/csv'
          inputRef={uploadInput}
          onChange={handleChangeUpload}
          type='file'
          style={{ display: 'none' }}
        />
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
    </Box>
  )
}
