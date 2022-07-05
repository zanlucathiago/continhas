import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography
} from '@mui/material'
import icons from '../icons'

export default function Transaction ({
  icon,
  isCredit,
  onClick,
  primary,
  secondary,
  total
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
    </ListItem>
  )
}
