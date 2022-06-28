import { AppBar, Toolbar, Typography } from '@mui/material'

function Header ({ children }) {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1, textAlign: 'center' }}
        >
          Continhas
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  )
}

export default Header
