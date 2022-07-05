import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import AlertContext from '../context/AlertContext'
import UserContext from '../context/UserContext'

function Register () {
  const { setToast } = useContext(AlertContext)
  const { register } = useContext(UserContext)

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
      register({ email, password }).catch(handleCatch)
    }
  }

  const handleCatch = () => {
    setLoading(false)
  }

  return (
    <>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        sx={{
          p: 2,
          textAlign: 'center',
          top: '50%',
          position: 'absolute',
          transform: 'translate(0px, -50%)',
          width: '100%'
        }}
      >
        <Stack spacing={2} style={{ alignItems: 'center' }}>
          <Typography variant='h6' component='div'>
            Criar sua conta no App
          </Typography>
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
