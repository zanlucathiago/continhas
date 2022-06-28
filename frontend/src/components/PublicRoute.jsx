import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Header from './Header'

export default function PublicRoute ({ children }) {
  const { user } = useContext(UserContext)
  return user ? (
    <Navigate to='/' replace />
  ) : (
    <>
      <Header />
      {children}
    </>
  )
}
