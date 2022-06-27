import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import transactionService from '../features/transaction/transactionService'
import {
  Box,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  Stack,
  TextField
} from '@mui/material'
import { useState } from 'react'

export default function Transaction ({ _id, defaultDescription, onDelete }) {
  const [description, setDescription] = useState(defaultDescription)
  const [timer, setTimer] = useState(null)
  const [open, setOpen] = useState(false)

  const [deleting, setDeleting] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    setDeleting(true)
    transactionService
      .deleteTransaction(_id)
      .then(onDelete)
      .catch(stopDeleting)
  }

  const stopDeleting = () => {
    setDeleting(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleChange = ({ target: { value } }) => {
    setDescription(value)
    clearTimeout(timer)
    setTimer(setTimeout(update(value), 3000))
  }

  const update = value => () => {
    transactionService.updateTransaction(_id, { description: value })
  }

  return (
    <>
      <ListItem>
        <ListItemButton onClick={handleOpen}>{description}</ListItemButton>
      </ListItem>
      <Drawer open={open} PaperProps={{ style: { width: '100%' } }}>
        <Stack direction='row' justifyContent='space-between'>
          <IconButton onClick={handleClose}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton disabled={deleting} onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Stack>
        <Box sx={{ p: 2 }}>
          <TextField
            label='Descrição'
            onChange={handleChange}
            style={{ width: '100%' }}
            value={description}
          />
        </Box>
      </Drawer>
    </>
  )
}
