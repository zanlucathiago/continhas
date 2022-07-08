import { createContext, useContext, useState } from "react"

const AlertContext = createContext()

export function AlertProvider({ children }) {
  const [toast, setToast] = useState(null)

  const clearToaster = () => {
    setToast(null)
  }

  return (
    <AlertContext.Provider
      value={{
        toast,
        clearToaster,
        setToast,
      }}
    >
      {children}
    </AlertContext.Provider>)
}

export default AlertContext