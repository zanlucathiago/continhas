import LoadingButton from '@mui/lab/LoadingButton'
import { Input } from '@mui/material'
import { useContext, useRef, useState } from 'react'
import AuthContext from '../context/AuthContext'

export default function AlertUploadButton ({ onUpload }) {
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
    <LoadingButton
      color='inherit'
      loading={uploading}
      onClick={handleClickUpload}
    >
      Importar
      <Input
        accept='text/csv'
        inputRef={uploadInput}
        key={String(uploading)}
        onChange={handleChangeUpload}
        type='file'
        style={{ display: 'none' }}
      />
    </LoadingButton>
  )
}
