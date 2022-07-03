import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Input } from '@mui/material'
import Fab from '@mui/material/Fab'
import { useContext, useRef, useState } from 'react'
import AuthContext from '../context/AuthContext'

export default function UploadButton ({ onUpload }) {
  const { createStatement } = useContext(AuthContext)

  const [uploading, setUploading] = useState(false)

  const uploadInput = useRef()

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
        .then(onSuccessUpload)
        .catch(handleCatch)
      setUploading(true)
    }
  }

  const onSuccessUpload = ({ account }) => {
    onUpload(account)
    setUploading(false)
  }

  const handleCatch = () => {
    setUploading(false)
  }

  return (
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
  )
}
