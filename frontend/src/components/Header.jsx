import PersonIcon from '@mui/icons-material/Person'
import LoginIcon from '@mui/icons-material/Login'
import {
  AppBar,
  Box,
  Link,
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
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Link color='inherit' href='/' underline='none'>
              GoalSetter
            </Link>
          </Box>
          <List style={{ display: 'flex' }}>
            <ListItem>
              <ListItemButton component='a' href='/login'>
                <ListItemIcon
                  style={{ color: 'inherit', justifyContent: 'space-around' }}
                >
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary='Entrar' />
              </ListItemButton>
            </ListItem>
            <ListItem>
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
