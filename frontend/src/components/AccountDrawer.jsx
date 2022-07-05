import CloseIcon from '@mui/icons-material/Close'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'

export default function AccountDrawer ({ open, onClose, onAddTab }) {
  const { createAccount } = useContext(AuthContext)

  const [creatingAccount, setCreatingAccount] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    title: ''
  })

  const handleClickCreate = () => {
    setCreatingAccount(true)
    createAccount(formData)
      .then(handleAccountCreated)
      .catch(stopLoading)
  }

  const stopLoading = () => {
    setCreatingAccount(false)
  }

  const handleAccountCreated = (data) => {
    setFormData({ title: '', email: '' })
    stopLoading()
    onAddTab(data)
  }

  const onChange = property => ({ target: { value } }) => {
    setFormData({ ...formData, [property]: value })
  }

  return (
    <Drawer open={open} PaperProps={{ style: { width: '100%' } }}>
      <Box component='form' noValidate autoComplete='off' sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Stack direction='row' justifyContent='space-between' spacing={2}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <Typography
              style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
            >
              Criar conta compartilhada
            </Typography>
            <LoadingButton
              disabled={!formData.email || !formData.title}
              onClick={handleClickCreate}
              loading={creatingAccount}
              type='submit'
            >
              Salvar
            </LoadingButton>
          </Stack>
          <TextField
            autoFocus
            label='Nome'
            onChange={onChange('title')}
            required
            style={{ width: '100%' }}
          />
          <TextField
            label='E-mail'
            onChange={onChange('email')}
            required
            style={{ width: '100%' }}
          />
        </Stack>
      </Box>
    </Drawer>
  )
}
