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

function Register () {
  const { register } = useContext(UserContext)
  const [toast, setToast] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: ''
  })

  const [loading, setLoading] = useState(false)

  const onChange = property => ({ target: { value } }) => {
    setFormData({ ...formData, [property]: value })
  }

  const { email, password, password2 } = formData

  const handleClick = () => {
    if (password !== password2) {
      setToast('As senhas são diferentes')
    } else {
      setLoading(true)
      register({ email, password }).catch(handleRegisterError)
    }
  }

  const handleRegisterError = error => {
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
          Crie uma conta
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
          <TextField
            disabled={loading}
            label='Confirmação da senha'
            onChange={onChange('password2')}
            type='password'
            value={password2}
          />
        </Stack>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2} direction='row'>
            <Grid item xs={6}>
              <Button component='a' href='/login' style={{ width: '100%' }}>
                Fazer login
              </Button>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                fullWidth
                onClick={handleClick}
                loading={loading}
                variant='contained'
              >
                Salvar
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Register
