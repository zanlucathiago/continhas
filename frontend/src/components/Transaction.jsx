import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography
} from '@mui/material'
import { useState } from 'react'
import icons from '../icons'
import TransactionDrawer from './TransactionDrawer'

export default function Transaction ({
  _id,
  icon,
  isCredit,
  primary,
  secondary,
  total
}) {
  const Icon = icons[icon]

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <ListItem disableGutters>
      <ListItemButton onClick={handleOpen} sx={{ p: 0 }}>
        <ListItemIcon style={{ minWidth: 51 }}>
          <SvgIcon
            component={Icon}
            color={isCredit ? 'success' : 'inherit'}
            fontSize='large'
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
          secondaryTypographyProps={{ component: 'span' }}
        />
      </ListItemButton>
      <TransactionDrawer
        key={open}
        id={_id}
        open={open}
        onClose={handleClose}
      />
    </ListItem>
  )
}
