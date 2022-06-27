import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import transactionService from '../features/transaction/transactionService'
import {
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  Stack
} from '@mui/material'
import { useState } from 'react'

export default function Transaction ({ _id, description }) {
  const [open, setOpen] = useState(false)

  const [deleting, setDeleting] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    setDeleting(true)
    transactionService.deleteTransaction(_id).then(onDeleted)
  }

  const onDeleted = () => {
    setDeleting(false)
    handleClose()
  }

  const handleOpen = () => {
    setOpen(true)
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
        {description}
      </Drawer>
    </>
  )
}
