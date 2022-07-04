import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Button } from '@mui/material'
import DefaultAlert from './DefaultAlert'
import ErrorAlertTitle from './ErrorAlertTitle'

export default function FetchAlert ({ children, onClick }) {
  return (
    <DefaultAlert
      action={
        <Button color='inherit' onClick={onClick}>
          Tentar novamente
        </Button>
      }
      Icon={ErrorOutlineIcon}
      severity='error'
    >
      <ErrorAlertTitle />
      {children}
    </DefaultAlert>
  )
}
