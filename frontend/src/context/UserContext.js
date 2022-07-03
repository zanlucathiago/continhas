import { createContext, useContext, useState } from "react";
import authService from "../features/authService";
import storageService from "../storage/storageService";
import AlertContext from "./AlertContext";

const UserContext = createContext()

export function UserProvider({ children }) {
  const { handleCatch } = useContext(AlertContext)
  const [user, setUser] = useState(storageService.getUser())

  const login = handleCatch((userData) => authService.login(userData).then(handleLoginSuccess))

  const handleLoginSuccess = (data) => {
    setUser(data);
    storageService.setUser(data)
  }

  const register = handleCatch((userData) => authService.register(userData).then(handleLoginSuccess))

  const logout = () => {
    setUser(null);
    storageService.removeUser()
  }

  return (
    <UserContext.Provider
      value={{
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