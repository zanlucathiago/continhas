import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import ShortTextIcon from '@mui/icons-material/ShortText'
import { Box, TextField } from '@mui/material'

export default function TransactionDrawerForm ({ description, date, value }) {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <ShortTextIcon sx={{ color: 'action.active', mr: 2, my: 2 }} />
        <TextField
          InputProps={{
            readOnly: true
          }}
          label='Descrição'
          multiline
          style={{ flexGrow: 1 }}
          value={description}
          variant='outlined'
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <EventAvailableIcon sx={{ color: 'action.active', mr: 2, my: 2 }} />
        <TextField
          InputProps={{
            readOnly: true
          }}
          label='Data'
          style={{ flexGrow: 1 }}
          value={date}
          variant='outlined'
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <AttachMoneyIcon sx={{ color: 'action.active', mr: 2, my: 2 }} />
        <TextField
          InputProps={{
            readOnly: true
          }}
          label='Valor'
          style={{ flexGrow: 1 }}
          value={value}
          variant='outlined'
        />
      </Box>
    </>
  )
}
