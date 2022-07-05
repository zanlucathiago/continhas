import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import UserContext from '../context/UserContext'

function Login () {
  const { login } = useContext(UserContext)

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

  const handleLoginError = () => {
    setLoading(false)
  }

  return (
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
          Fazer login
        </Typography>
        <Typography>Use seu e-mail</Typography>
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
  )
}

export default Login
