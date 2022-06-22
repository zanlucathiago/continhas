import PersonIcon from '@mui/icons-material/Person'
import LoginIcon from '@mui/icons-material/Login'
import {
  AppBar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material'

function Header () {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <List style={{ display: 'flex', width: '100%' }}>
            <ListItem>
              <ListItemButton component='a' href='/'>
                <ListItemText primary='Início' />
              </ListItemButton>
            </ListItem>
            <ListItem style={{ flex: 1 }}>
              <ListItemButton component='a' href='/login'>
                <ListItemIcon
                  style={{ color: 'inherit', justifyContent: 'space-around' }}
                >
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary='Entrar' />
              </ListItemButton>
            </ListItem>
            <ListItem style={{ flex: 1 }}>
              <ListItemButton component='a' href='/register'>
                <ListItemIcon
                  style={{ color: 'inherit', justifyContent: 'space-around' }}
                >
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Registrar' />
              </ListItemButton>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
