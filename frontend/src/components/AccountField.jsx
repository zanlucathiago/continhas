import AccountCircle from '@mui/icons-material/AccountCircle'
import { Box, TextField } from '@mui/material'

export default function AccountField({ value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <AccountCircle sx={{ color: 'action.active', mr: 2, my: 2 }} />
      <Box style={{ flexGrow: 1 }}>
        <TextField
          label='Conta de origem'
          InputProps={{
            readOnly: true
          }}
          style={{ width: '100%' }}
          value={value}
          variant='outlined'
        />
      </Box>
    </Box>
  )
}
