import AddIcon from '@mui/icons-material/Add'
import { Box, Skeleton, Stack, Tab, Tabs } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import AccountDrawer from '../components/AccountDrawer'
import TransactionList from '../components/TransactionList'
import UploadButton from '../components/UploadButton'
import AuthContext from '../context/AuthContext'

const ADD_ACCOUNT = 'NEW_ACCOUNT'
const DEFAULT_ACCOUNT = 'DEFAULT'

export default function Dashboard () {
  const { getAccounts } = useContext(AuthContext)

  const [accounts, setAccounts] = useState(null)

  const [addAccount, setAddAccount] = useState(false)

  const [listKey, setListKey] = useState(false)

  const [activeTab, setValue] = useState(DEFAULT_ACCOUNT)

  const handleChange = (_event, newValue) => {
    if (ADD_ACCOUNT === newValue) {
      setAddAccount(true)
    } else {
      setValue(newValue)
    }
  }

  const fetchAccounts = () => {
    getAccounts().then(setAccounts)
  }

  useEffect(fetchAccounts, [])

  const uploadInput = useRef()

  const handleClickUpload = () => {
    uploadInput.current.click()
  }

  const handleClose = () => {
    setAddAccount(false)
  }

  const handleAddTab = _id => {
    setValue(_id)
    setAccounts(null)
    fetchAccounts()
    handleClose()
  }

  const handleUpload = account => {
    setListKey(!listKey)
    setValue(account)
  }

  return (
    <>
      <AccountDrawer
        open={addAccount}
        onClose={handleClose}
        onAddTab={handleAddTab}
      />
      <Tabs
        sx={{
          position: 'sticky',
          top: 56,
          zIndex: 2,
          bgcolor: 'background.default'
        }}
        variant='scrollable'
        value={activeTab}
        onChange={handleChange}
      >
        <Tab label='Minha conta' value={DEFAULT_ACCOUNT} wrapped />
        <Tab label='Cartão de crédito' value='CREDIT_CARD' wrapped />
        {accounts ? (
          accounts.map(account => (
            <Tab
              key={account._id}
              label={account.title}
              value={account._id}
              wrapped
            />
          ))
        ) : (
          <Tab
            disabled
            label={
              <>
                <Skeleton style={{ width: '100%' }} />
                <Skeleton style={{ width: '100%' }} />
              </>
            }
            wrapped
          />
        )}
        <Tab
          icon={<AddIcon fontSize='small' />}
          iconPosition='start'
          label='Nova conta'
          style={{ minHeight: 48 }}
          wrapped
          value={ADD_ACCOUNT}
        />
      </Tabs>
      <Box sx={{ p: 2 }}>
        <Stack spacing={2}>
          <TransactionList
            key={`${String(listKey)}-${activeTab}`}
            account={activeTab}
            onUpload={handleClickUpload}
          />
        </Stack>
        <UploadButton onUpload={handleUpload} />
      </Box>
    </>
  )
}
