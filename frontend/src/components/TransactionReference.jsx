import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useState } from 'react'
import ViewReferenceDrawer from './ViewReferenceDrawer'

export default function TransactionReference ({ account, value, id, onDelete }) {
  const [open, setOpen] = useState(null)

  const handleClick = () => {
    setOpen(id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ListItem>
      <ViewReferenceDrawer key={open} id={open} onClose={handleClose} onDelete={onDelete} />
      <ListItemButton onClick={handleClick} style={{ paddingLeft: 0 }}>
        <ListItemText primary={account} secondary={value} />
      </ListItemButton>
    </ListItem>
  )
}
