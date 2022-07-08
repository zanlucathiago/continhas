import PercentIcon from '@mui/icons-material/Percent'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Box,
  Drawer,
  IconButton,
  Slider,
  Stack,
  TextField
} from '@mui/material'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import AccountSelect from './AccountSelect'
import { MARK_MAPPER, marks, VALUE_MAPPER } from '../constants/step'

export default function AddReferenceDrawer ({
  onAddReference,
  onAddTab,
  onClose,
  transaction,
  transactionValue
}) {
  const [saving, setSaving] = useState(false)

  const getValue = percent => {
    const { value, key } = MARK_MAPPER[String(percent)]

    return {
      value: Math.round(100 * transactionValue * value) / 100,
      step: key
    }
  }

  const [referenceData, setReferenceData] = useState({
    account: '',
    ...getValue(VALUE_MAPPER.FULL)
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

  const handleChange = (_event, percent) => {
    setReferenceData({
      ...referenceData,
      ...getValue(percent)
    })
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
            <PercentIcon sx={{ color: 'action.active', mr: 2, my: 2 }} />
            <Box sx={{ flexGrow: 1, my: '6px', mr: '5px' }}>
              <Slider
                defaultValue={142}
                max={142}
                onChange={handleChange}
                step={null}
                marks={marks}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <AttachMoneyIcon sx={{ color: 'action.active', mr: 2, my: 2 }} />
            <TextField
              label='Valor'
              InputProps={{
                readOnly: true
              }}
              style={{ flexGrow: 1 }}
              value={Math.abs(referenceData.value).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
              })}
              variant='outlined'
            />
          </Box>
        </Stack>
      </Box>
    </Drawer>
  )
}
