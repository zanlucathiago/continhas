import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon
} from '@mui/material'
import icons from '../icons'

export default function Transaction ({
  children,
  icon,
  isCredit,
  onClick,
  primary
}) {
  const Icon = icons[icon]

  return (
    <ListItem disableGutters>
      <ListItemButton onClick={onClick} sx={{ p: 0 }}>
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
          secondary={children}
          secondaryTypographyProps={{ component: 'span' }}
        />
      </ListItemButton>
    </ListItem>
  )
}
