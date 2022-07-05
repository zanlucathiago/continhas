import AddIcon from '@mui/icons-material/Add'
import { Box, Skeleton, Stack, Tab, Tabs } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import AccountDrawer from '../components/AccountDrawer'
import DefaultList from '../components/DefaultList'
import FetchAlert from '../components/FetchAlert'
import FetchSkeleton from '../components/FetchSkeleton'
import AuthContext from '../context/AuthContext'

const ADD_ACCOUNT = 'NEW_ACCOUNT'

const DEFAULT_ACCOUNT = 'DEFAULT'

export default function Dashboard () {
  const [alert, setAlert] = useState(null)

  const { getAccounts } = useContext(AuthContext)

  const [references, setReferences] = useState(null)

  const [addAccount, setAddAccount] = useState(false)

  const [activeTab, setActiveTab] = useState(DEFAULT_ACCOUNT)

  const handleChange = (_event, newValue) => {
    if (ADD_ACCOUNT === newValue) {
      setAddAccount(true)
    } else {
      setActiveTab(newValue)
    }
  }

  const fetchReferences = () => {
    getAccounts()
      .then(setReferences)
      .catch(handleCatch)
  }

  const handleCatch = ({ message }) => {
    setAlert(message)
  }

  useEffect(fetchReferences, [])

  const handleClose = () => {
    setAddAccount(false)
  }

  const handleAddTab = ({ _id }) => {
    setActiveTab(_id)
    setReferences(null)
    fetchReferences()
    handleClose()
  }

  const onTabAdded = data => {
    setReferences([...references, data])
  }

  const handleClick = () => {
    setAlert(null)
    fetchReferences()
  }

  return (
    <>
      <AccountDrawer
        key={String(addAccount)}
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
        {references
          ? references.map(account => (
              <Tab
                key={account._id}
                label={account.title}
                value={account._id}
                wrapped
              />
            ))
          : !alert && (
              <Tab
                disabled
                label={<Skeleton style={{ width: '100%' }} />}
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
          {(!references &&
            (alert ? (
              <FetchAlert onClick={handleClick}>{alert}</FetchAlert>
            ) : (
              <FetchSkeleton />
            ))) || (
            <DefaultList
              account={activeTab}
              onAddTab={onTabAdded}
              onChangeAccount={setActiveTab}
            />
          )}
        </Stack>
      </Box>
    </>
  )
}
