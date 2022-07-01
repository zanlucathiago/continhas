import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Alert, Button, Snackbar } from '@mui/material'
import { useContext } from 'react'
import AlertContext from '../context/AlertContext'
import ErrorAlertTitle from './ErrorAlertTitle'

export default function ErrorSnackbar () {
  const { toast, clearToaster } = useContext(AlertContext)

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={Boolean(toast)}
      autoHideDuration={3000}
      onClose={clearToaster}
      sx={{ height: '100%' }}
    >
      <Alert
        elevation={6}
        action={
          <Button color='inherit' onClick={clearToaster}>
            OK
          </Button>
        }
        icon={<ErrorOutlineIcon fontSize='large' />}
        onClose={clearToaster}
        severity='error'
        style={{
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center'
        }}
        variant='filled'
      >
        <ErrorAlertTitle />
        {toast}
      </Alert>
    </Snackbar>
  )
}
