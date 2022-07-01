import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Box, Input, Stack, Tab, Tabs } from '@mui/material'
import Fab from '@mui/material/Fab'
import { useContext, useRef, useState } from 'react'
import TransactionList from '../components/TransactionList'
import AuthContext from '../context/AuthContext'

const DEFAULT_ACCOUNT = 'DEFAULT'

export default function Dashboard () {
  const [listKey, setListKey] = useState(false)

  const [uploading, setUploading] = useState(false)

  const [value, setValue] = useState(DEFAULT_ACCOUNT)

  const handleChange = (_event, newValue) => {
    setValue(newValue)
  }

  const uploadInput = useRef()

  const { createStatement } = useContext(AuthContext)

  const handleClickUpload = () => {
    uploadInput.current.click()
  }

  const handleChangeUpload = event => {
    const {
      target: {
        files: [file]
      }
    } = event
    if (file) {
      file
        .text()
        .then(createStatement)
        .then(onUpload)
        .catch(handleCatch)
      setUploading(true)
    }
  }

  const onUpload = () => {
    setListKey(!listKey)
    setUploading(false)
  }

  const handleCatch = () => {
    setUploading(false)
  }

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Tabs value={value} onChange={handleChange} variant='fullWidth'>
          <Tab label='Minha conta' value={DEFAULT_ACCOUNT} />
          <Tab label='Cartão de crédito' value='CREDIT_CARD' />
        </Tabs>
        <TransactionList
          key={`${String(listKey)}-${value}`}
          account={value}
          onUpload={handleClickUpload}
        />
      </Stack>
      <Fab
        color='primary'
        disabled={uploading}
        onClick={handleClickUpload}
        style={{
          position: 'fixed',
          bottom: 16,
          left: '50%',
          transform: 'translate(-50%, 0)'
        }}
      >
        <FileUploadIcon />
        <Input
          accept='text/csv'
          inputRef={uploadInput}
          key={String(uploading)}
          onChange={handleChangeUpload}
          type='file'
          style={{ display: 'none' }}
        />
      </Fab>
    </Box>
  )
}
