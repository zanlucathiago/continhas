import FileUploadIcon from '@mui/icons-material/FileUpload'
import Fab from '@mui/material/Fab'
import { useContext, useRef } from 'react'
import { Box, Input } from '@mui/material'
import AuthContext from '../context/AuthContext'
import TransactionList from '../components/TransactionList'

export default function Dashboard () {
  const uploadInput = useRef()
  const { createStatement } = useContext(AuthContext)

  const handleClickUpload = () => {
    uploadInput.current.click()
  }

  const handleChangeUpload = ({
    target: {
      files: [file]
    }
  }) => {
    if (file) {
      file.text().then(createStatement)
    }
  }

  return (
    <Box sx={{ p: 2 }}>
      <TransactionList />
      <Fab
        color='primary'
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
          onChange={handleChangeUpload}
          type='file'
          style={{ display: 'none' }}
        />
      </Fab>
    </Box>
  )
}
