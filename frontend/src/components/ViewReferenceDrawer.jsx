import AccountCircle from '@mui/icons-material/AccountCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import DeleteIcon from '@mui/icons-material/Delete'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Box,
  Drawer,
  IconButton, Stack,
  TextField,
  Typography
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import FetchAlert from './FetchAlert'
import FetchSkeleton from './FetchSkeleton'
import OriginTransactionDetails from './OriginTransactionDetails'

export default function ViewReferenceDrawer ({ id, onClose, onChange }) {
  const [loading, setLoading] = useState(false)

  const [alert, setAlert] = useState(null)

  const [referenceData, setReferenceData] = useState(null)

  const { getReference, deleteReference, updateReference } = useContext(
    AuthContext
  )

  const fetchReference = () => {
    getReference(id)
      .then(setReferenceData)
      .catch(handleCatch)
  }

  const handleCatch = ({ message }) => {
    setAlert(message)
  }

  const onOpenDrawer = () => {
    if (id) {
      fetchReference()
    }
  }

  useEffect(onOpenDrawer, [id])

  const handleClick = () => {
    setAlert(null)
    fetchReference()
  }

  const handleClickDelete = () => {
    setLoading(true)
    deleteReference(id)
      .then(onChange)
      .catch(stopLoading)
  }

  const stopLoading = () => {
    setLoading(false)
  }

  const handleClickConfirm = () => {
    setLoading(true)
    updateReference(id, { confirmed: true })
      .then(onChange)
      .catch(stopLoading)
  }

  return (
    <Drawer open={Boolean(id)} PaperProps={{ style: { width: '100%' } }}>
      <Stack direction='row' justifyContent='space-between'>
        <IconButton onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
        {referenceData && !referenceData.isExternal && (
          <IconButton disabled={loading} onClick={handleClickDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      <Box sx={{ p: 2 }}>
        {(referenceData && (
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 2, my: 2 }} />
              <Box style={{ flexGrow: 1 }}>
                <TextField
                  label='Conta de origem'
                  InputProps={{
                    readOnly: true
                  }}
                  style={{ width: '100%' }}
                  value={referenceData.account}
                  variant='outlined'
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
                value={referenceData.value}
                variant='outlined'
              />
            </Box>
            <OriginTransactionDetails primary={referenceData.label}>
              <Typography variant='body2' noWrap>
                {referenceData.secondary}
              </Typography>
              <Typography variant='body2'>
                {referenceData.transactionValue}
              </Typography>
            </OriginTransactionDetails>
          </Stack>
        )) ||
          (alert ? (
            <FetchAlert onClick={handleClick}>{alert}</FetchAlert>
          ) : (
            <FetchSkeleton />
          ))}
      </Box>
      {referenceData && referenceData.isExternal && (
        <Box sx={{ position: 'absolute', bottom: 0, right: 0, p: 2 }}>
          <LoadingButton loading={loading} onClick={handleClickConfirm}>
            Confirmar
          </LoadingButton>
        </Box>
      )}
    </Drawer>
  )
}
