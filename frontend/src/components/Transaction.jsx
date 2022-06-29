import icons from '../icons'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Box,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'

export default function Transaction ({
  _id,
  defaultDescription,
  icon,
  isCredit,
  onDelete,
  primary,
  secondary,
  total
}) {
  const Icon = icons[icon]
  const { deleteTransaction, updateTransaction } = useContext(AuthContext)
  const [description, setDescription] = useState(defaultDescription)
  const [timer, setTimer] = useState(null)
  const [open, setOpen] = useState(false)

  const [deleting, setDeleting] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    setDeleting(true)
    deleteTransaction(_id)
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
    updateTransaction(_id, { description: value })
  }

  return (
    <>
      <ListItem disableGutters>
        <ListItemButton onClick={handleOpen} sx={{ p: 0 }}>
          <ListItemIcon style={{ minWidth: 40 }}>
            <SvgIcon
              component={Icon}
              color={isCredit ? 'success' : 'inherit'}
            />
          </ListItemIcon>
          <ListItemText
            primary={primary}
            primaryTypographyProps={{ noWrap: true }}
            secondary={
              <>
                <Typography variant='body2' noWrap>
                  {secondary}
                </Typography>
                <Typography variant='body2'>{total}</Typography>
              </>
            }
          />
        </ListItemButton>
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
