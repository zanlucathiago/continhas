import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import PersonIcon from '@mui/icons-material/Person'
import {
  Alert,
  Box,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import authService from '../features/auth/authService'

function Register () {
  const [toast, setToast] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: ''
  })

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onChange = property => ({ target: { value } }) => {
    setFormData({ ...formData, [property]: value })
  }

  const { email, password, password2 } = formData

  const handleClick = async () => {
    if (password !== password2) {
      setToast('As senhas são diferentes')
    } else {
      setLoading(true)
      try {
        await authService.register({ email, password })
        navigate('/')
      } catch (error) {
        setLoading(false)
        setToast(error.response.data.message)
      }
    }
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
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete='off'
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Stack spacing={2} alignItems='center'>
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
          <LoadingButton
            fullWidth
            onClick={handleClick}
            loading={loading}
            loadingPosition='start'
            startIcon={<SaveIcon />}
            variant='contained'
          >
            Salvar
          </LoadingButton>
        </Stack>
      </Box>
    </>
  )
}

export default Register
