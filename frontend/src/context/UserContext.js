import { createContext, useState } from "react"
import authService from "../features/auth/authService";
import storageService from "../storage/storageService";

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(storageService.getUser())

  const login = (userData) => authService.login(userData).then(handleLoginSuccess)

  const handleLoginSuccess = (data) => {
    setUser(data);
    storageService.setUser(data)
  }

  const register = (userData) => authService.register(userData).then(handleLoginSuccess)

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