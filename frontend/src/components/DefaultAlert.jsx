import { Alert } from '@mui/material'

export default function DefaultAlert ({ children, severity, action, Icon }) {
  return (
    <Alert
      action={action}
      icon={<Icon fontSize='large' />}
      severity={severity}
      style={{
        alignItems: 'center',
        flexDirection: 'column',
        left: '16px',
        textAlign: 'center',
        right: '16px',
        top: '50%',
        position: 'absolute',
        transform: 'translate(0px, -50%)'
      }}
    >
      {children}
    </Alert>
  )
}
