import { createContext, useState } from "react"

const AlertContext = createContext()

export function AlertProvider({ children }) {
  const [toast, setToast] = useState(null)

  const clearToaster = () => {
    setToast(null)
  }

  const handleCatch = (callback) => (...args) => callback(...args).catch(({ message }) => {
    setToast(message)
    throw Error()
  })

  return (
    <AlertContext.Provider
      value={{
        toast,
        handleCatch,
        clearToaster,
        setToast,
      }}
    >
      {children}
    </AlertContext.Provider>)
}

export default AlertContext