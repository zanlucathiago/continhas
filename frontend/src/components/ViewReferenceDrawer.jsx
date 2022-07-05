import AccountCircle from '@mui/icons-material/AccountCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import DeleteIcon from '@mui/icons-material/Delete'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import FetchAlert from './FetchAlert'
import FetchSkeleton from './FetchSkeleton'

export default function ViewReferenceDrawer ({ id, onClose, onDelete }) {
  const [deleting, setDeleting] = useState(false)

  const [alert, setAlert] = useState(null)

  const [referenceData, setReferenceData] = useState(null)

  const { getReference, deleteReference } = useContext(AuthContext)

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
    setDeleting(true)
    deleteReference(id)
      .then(onDelete)
      .catch(stopDeleting)
  }

  const stopDeleting = () => {
    setDeleting(false)
  }

  return (
    <Drawer open={Boolean(id)} PaperProps={{ style: { width: '100%' } }}>
      <Stack direction='row' justifyContent='space-between'>
        <IconButton onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton disabled={deleting} onClick={handleClickDelete}>
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Box sx={{ p: 2 }}>
        {(referenceData && (
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 2, my: 2 }} />
              <Box style={{ flexGrow: 1 }}>
                <TextField
                  label='Conta'
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SubdirectoryArrowRightIcon
                sx={{ color: 'action.active', mr: 2, my: 2 }}
              />
              <Box style={{ flexGrow: 1 }}>
                <List disablePadding dense>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={referenceData.label}
                      primaryTypographyProps={{ noWrap: true }}
                      secondary={
                        <>
                          <Typography variant='body2' noWrap>
                            {referenceData.secondary}
                          </Typography>
                          <Typography variant='body2'>
                            {referenceData.transactionValue}
                          </Typography>
                        </>
                      }
                      secondaryTypographyProps={{ component: 'span' }}
                    />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Stack>
        )) ||
          (alert ? (
            <FetchAlert onClick={handleClick}>{alert}</FetchAlert>
          ) : (
            <FetchSkeleton />
          ))}
      </Box>
    </Drawer>
  )
}
