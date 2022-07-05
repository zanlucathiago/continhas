import ArrowBackIcon from '@mui/icons-material/ArrowBack'
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
  Stack
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import AddReferenceDrawer from './AddReferenceDrawer'
import TransactionDrawerForm from './TransactionDrawerForm'
import TransactionReference from './TransactionReference'

export default function TransactionDrawer ({ id, onAddTab, open, onClose }) {
  const [reportDrawer, setReportDrawer] = useState(null)

  const [formData, setFormData] = useState(null)

  const { getTransaction } = useContext(AuthContext)

  const onTransactionOpen = () => {
    if (open) {
      fetchTransaction()
    }
  }

  const fetchTransaction = () => {
    getTransaction(id).then(setFormData)
  }

  useEffect(onTransactionOpen, [open])

  const handleClick = () => {
    setReportDrawer(formData._id)
  }

  const handleClose = () => {
    setReportDrawer(false)
  }

  const refreshData = () => {
    setFormData(null)
    fetchTransaction()
  }

  return (
    <Drawer open={Boolean(open)} PaperProps={{ style: { width: '100%' } }}>
      <AddReferenceDrawer
        key={reportDrawer}
        onAddReference={refreshData}
        onAddTab={onAddTab}
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
            <TransactionDrawerForm
              description={formData.description}
              date={formData.date}
              value={formData.value}
            />
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <SubdirectoryArrowRightIcon
                sx={{ color: 'action.active', mr: 2, my: 2 }}
              />
              <Box style={{ flexGrow: 1 }}>
                <List disablePadding dense>
                  {formData.reports.map(({ account, value, _id }) => (
                    <TransactionReference
                      key={_id}
                      id={_id}
                      account={account}
                      onDelete={refreshData}
                      value={value}
                    />
                  ))}
                  <ListItem sx={{ my: '6px' }}>
                    <ListItemButton
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
