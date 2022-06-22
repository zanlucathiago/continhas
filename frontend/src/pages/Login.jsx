import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

function Login () {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1414)
  }

  return (
    <>
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
          <TextField label='Nome' />
          <TextField label='Senha' type='password' />
          <LoadingButton
            fullWidth
            onClick={handleClick}
            loading={loading}
            loadingPosition='start'
            startIcon={<SendIcon />}
            variant='contained'
          >
            Entrar
          </LoadingButton>
        </Stack>
      </Box>
    </>
  )
}

export default Login
