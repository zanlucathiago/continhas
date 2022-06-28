import AccountCircle from '@mui/icons-material/AccountCircle'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import UserContext from '../context/UserContext'
import Header from './Header'

export default function PrivateRoute ({ children }) {
  const { user } = useContext(UserContext)

  const [anchorEl, setAnchorEl] = useState(null)

  const { logout } = useContext(UserContext)

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return user ? (
    <AuthProvider>
      <Header>
        <IconButton onClick={handleMenu}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={logout}>Sair</MenuItem>
        </Menu>
      </Header>
      {children}
    </AuthProvider>
  ) : (
    <Navigate to='/login' replace />
  )
}
