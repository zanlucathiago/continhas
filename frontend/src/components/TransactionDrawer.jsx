import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import ShortTextIcon from '@mui/icons-material/ShortText'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
  TextField
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import ReferenceDrawer from './ReferenceDrawer'

export default function TransactionDrawer ({ id, open, onClose }) {
  const [reportDrawer, setReportDrawer] = useState(null)

  const [formData, setFormData] = useState(null)

  const { getTransaction } = useContext(AuthContext)

  const onTransactionOpen = () => {
    if (open) {
      getTransaction(id).then(setFormData)
    }
  }

  useEffect(onTransactionOpen, [open])

  const handleClick = () => {
    setReportDrawer(formData._id)
  }

  const handleClose = () => {
    setReportDrawer(false)
  }

  const handleAddReference = () => {
    setFormData(null)
    getTransaction(id).then(setFormData)
  }

  return (
    <Drawer open={open} PaperProps={{ style: { width: '100%' } }}>
      <ReferenceDrawer
        key={reportDrawer}
        onAddReference={handleAddReference}
        onClose={handleClose}
        transaction={reportDrawer}
      />
      <Stack direction='row' justifyContent='space-between'>
        <IconButton onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
      </Stack>
      {formData ? (
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <ShortTextIcon sx={{ color: 'action.active', mr: 2, my: 2 }} />
              <TextField
                InputProps={{
                  readOnly: true
                }}
                label='Descrição'
                multiline
                style={{ flexGrow: 1 }}
                value={formData.description}
                variant='outlined'
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <EventAvailableIcon
                sx={{ color: 'action.active', mr: 2, my: 2 }}
              />
              <TextField
                InputProps={{
                  readOnly: true
                }}
                label='Data'
                style={{ flexGrow: 1 }}
                value={formData.date}
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
                value={formData.value}
                variant='outlined'
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <SubdirectoryArrowRightIcon
                sx={{ color: 'action.active', mr: 2, my: 2 }}
              />
              <Box style={{ flexGrow: 1 }}>
                <List disablePadding dense>
                  {formData.reports.map(({ account, value, _id }) => (
                    <ListItem key={_id}>
                      <ListItemText primary={account} secondary={value} />
                    </ListItem>
                  ))}
                  <ListItem sx={{ my: '6px' }}>
                    <ListItemButton
                      disabled={!formData.hasAccounts}
                      onClick={handleClick}
                      style={{ paddingLeft: 0 }}
                    >
                      <ListItemText primary='Adicionar referências' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Stack>
        </Box>
      ) : (
        <Skeleton />
      )}
    </Drawer>
  )
}
