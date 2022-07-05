import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import AccountDrawer from './AccountDrawer'

const ADD_ACCOUNT = 'NEW_ACCOUNT'

export default function AccountSelect ({ onAddTab, onChange }) {
  const { getAccounts } = useContext(AuthContext)

  const [value, setValue] = useState('')

  const [addAccount, setAddAccount] = useState(false)

  const [accounts, setAccounts] = useState('')

  const onGetAccounts = data => {
    setAccounts(data)
    const { length } = data
    if (length) {
      const { _id } = data[length - 1]
      setValue(_id)
      onChange({ target: { value: _id } })
    }
  }

  const fetchAccounts = () => {
    getAccounts().then(onGetAccounts)
  }

  useEffect(fetchAccounts, [])

  const handleChange = event => {
    if (event.target.value === ADD_ACCOUNT) {
      setAddAccount(true)
    } else {
      onChange(event)
      setValue(event.target.value)
    }
  }

  const handleClose = () => {
    setAddAccount(false)
  }

  const handleAddTab = data => {
    onAddTab(data)
    setAccounts(null)
    fetchAccounts()
    handleClose()
  }

  return accounts ? (
    <FormControl fullWidth required>
      <AccountDrawer
        open={addAccount}
        onClose={handleClose}
        onAddTab={handleAddTab}
      />
      <InputLabel>Conta</InputLabel>
      <Select value={value} label='Conta' onChange={handleChange}>
        {accounts.map(({ title, _id }) => (
          <MenuItem key={_id} value={_id}>
            {title}
          </MenuItem>
        ))}
        <MenuItem value={ADD_ACCOUNT}>Nova conta</MenuItem>
      </Select>
    </FormControl>
  ) : (
    <FormControl fullWidth>
      <Skeleton />
    </FormControl>
  )
}
