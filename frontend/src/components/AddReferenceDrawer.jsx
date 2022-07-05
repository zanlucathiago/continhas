import AccountCircle from '@mui/icons-material/AccountCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Drawer, IconButton, Stack, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import AccountSelect from './AccountSelect'

export default function AddReferenceDrawer ({
  onAddReference,
  onAddTab,
  onClose,
  transaction
}) {
  const [saving, setSaving] = useState(false)

  const [referenceData, setReferenceData] = useState({
    account: '',
    value: ''
  })

  const { createReference } = useContext(AuthContext)

  const handleChangeReference = key => ({ target: { value } }) => {
    setReferenceData({ ...referenceData, [key]: value })
  }

  const handleClickSave = () => {
    setSaving(true)
    createReference({ ...referenceData, transaction })
      .then(onReferenceSaved)
      .catch(stopSaving)
  }

  const onReferenceSaved = data => {
    onAddReference(data)
    stopSaving()
    onClose()
  }

  const stopSaving = () => {
    setSaving(false)
  }

  return (
    <Drawer
      open={Boolean(transaction)}
      PaperProps={{ style: { width: '100%' } }}
    >
      <Stack direction='row' justifyContent='space-between'>
        <IconButton onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
        <LoadingButton
          disabled={!referenceData.value || !referenceData.account}
          loading={saving}
          onClick={handleClickSave}
        >
          Salvar
        </LoadingButton>
      </Stack>
      <Box sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 2, my: 2 }} />
            <Box style={{ flexGrow: 1 }}>
              <AccountSelect
                onAddTab={onAddTab}
                onChange={handleChangeReference('account')}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <AttachMoneyIcon sx={{ color: 'action.active', mr: 2, my: 2 }} />
            <TextField
              label='Valor'
              onChange={handleChangeReference('value')}
              required
              style={{ flexGrow: 1 }}
              type='number'
              value={referenceData.value}
              variant='outlined'
            />
          </Box>
        </Stack>
      </Box>
    </Drawer>
  )
}
