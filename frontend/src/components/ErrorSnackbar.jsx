import { Alert, Snackbar } from '@mui/material'
import { useContext } from 'react'
import AlertContext from '../context/AlertContext'

export default function ErrorSnackbar () {
  const { toast, clearToaster } = useContext(AlertContext)

  return (
    <Snackbar
      open={Boolean(toast)}
      autoHideDuration={3000}
      onClose={clearToaster}
    >
      <Alert
        elevation={6}
        onClose={clearToaster}
        severity='error'
        style={{ alignItems: 'center' }}
        sx={{ width: '100%' }}
        variant='filled'
      >
        {toast}
      </Alert>
    </Snackbar>
  )
}
