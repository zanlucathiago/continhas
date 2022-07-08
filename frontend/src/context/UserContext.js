import { useNavigate } from 'react-router-dom'
import { createContext, useContext, useState } from "react";
import authService from "../features/authService";
import storageService from "../storage/storageService";
import AlertContext from "./AlertContext";

const UserContext = createContext()

export function UserProvider({ children }) {
  const { setToast } = useContext(AlertContext)

  const [user, setUser] = useState(storageService.getUser())

  const navigate = useNavigate()

  const handleCatch = (callback) => (...args) => callback(...args).catch((error) => {
    if (error?.response?.status === 401) {
      logout()
    } else {
      const message = error?.response?.data.message || 'A solicitação falhou devido a um erro de conexão.'
  
      if (error?.response?.config.method !== 'get') {
        setToast(message)
      }

      throw Error(message)
    }
  })

  const login = handleCatch((userData) => authService.login(userData).then(handleLoginSuccess))

  const handleLoginSuccess = (data) => {
    setUser(data);
    storageService.setUser(data)
  }

  const register = handleCatch((userData) => authService.register(userData).then(handleLoginSuccess))

  const logout = () => {
    setUser(null);
    storageService.removeUser()
    navigate('/login')
  }

  return (
    <UserContext.Provider
      value={{
        handleCatch,
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext