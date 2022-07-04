import AccountCircle from '@mui/icons-material/AccountCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Box,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'

export default function ReferenceDrawer ({
  onAddReference,
  onClose,
  transaction
}) {
  const [saving, setSaving] = useState(false)

  const [referenceData, setReferenceData] = useState({
    account: '',
    value: ''
  })

  const { getAccounts, createReference } = useContext(AuthContext)

  const [accounts, setAccounts] = useState('')

  const onGetAccounts = data => {
    setAccounts(data)
    setReferenceData({ ...referenceData, account: data[0]._id })
  }

  const fetchAccounts = () => {
    getAccounts().then(onGetAccounts)
  }

  useEffect(fetchAccounts, [])

  const handleChangeReference = key => ({ target: { value } }) => {
    setReferenceData({ ...referenceData, [key]: value })
  }

  const handleClickSave = () => {
    setSaving(true)
    createReference({ ...referenceData, transaction })
      .then(onReferenceSaved)
      .catch(stopSaving)
  }

  const onReferenceSaved = () => {
    onAddReference()
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
          disabled={!referenceData.value}
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
              {accounts ? (
                <FormControl fullWidth>
                  <InputLabel>Conta</InputLabel>
                  <Select
                    value={referenceData.account}
                    label='Conta'
                    onChange={handleChangeReference('account')}
                  >
                    {accounts.map(({ title, _id }) => (
                      <MenuItem key={_id} value={_id}>
                        {title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  <Skeleton />
                </FormControl>
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <AttachMoneyIcon sx={{ color: 'action.active', mr: 2, my: 2 }} />
            <TextField
              label='Valor'
              onChange={handleChangeReference('value')}
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
