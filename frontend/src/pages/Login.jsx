import LoadingButton from '@mui/lab/LoadingButton'
import PersonIcon from '@mui/icons-material/Person'
import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useContext, useState } from 'react'
import UserContext from '../context/UserContext'

function Login () {
  const { login } = useContext(UserContext)
  const [toast, setToast] = useState(null)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const onChange = property => ({ target: { value } }) => {
    setFormData({ ...formData, [property]: value })
  }

  const { email, password } = formData

  const handleClick = () => {
    setLoading(true)
    login({ email, password }).catch(handleLoginError)
  }

  const handleLoginError = error => {
    setLoading(false)
    setToast(error.response.data.message)
  }

  const handleClose = () => {
    setToast('')
  }

  return (
    <>
      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={1414}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          onClose={handleClose}
          severity='error'
          sx={{ width: '100%' }}
          variant='filled'
        >
          {toast}
        </Alert>
      </Snackbar>
      <Stack
        direction='row'
        justifyContent='center'
        spacing={2}
        alignItems='center'
      >
        <PersonIcon />
        <Typography variant='h6' component='div'>
          Entre com sua conta
        </Typography>
      </Stack>
      <Box component='form' noValidate autoComplete='off' sx={{ p: 2 }}>
        <Stack spacing={2}>
          <TextField
            disabled={loading}
            label='E-mail'
            type='email'
            value={email}
            onChange={onChange('email')}
          />
          <TextField
            disabled={loading}
            label='Senha'
            onChange={onChange('password')}
            type='password'
            value={password}
          />
        </Stack>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2} direction='row'>
            <Grid item xs={6}>
              <Button component='a' href='/register' style={{ width: '100%' }}>
                Criar conta
              </Button>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                fullWidth
                onClick={handleClick}
                loading={loading}
                variant='contained'
              >
                Entrar
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Login
