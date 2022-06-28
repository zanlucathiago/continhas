import { createContext, useContext } from "react"
import transactionService from "../features/transaction/transactionService";
import UserContext from "./UserContext";

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const { user: { token } } = useContext(UserContext)

  const getTransactions = transactionService.getTransactions(token)

  const createTransaction = transactionService.createTransaction(token)

  const updateTransaction = transactionService.updateTransaction(token)

  const deleteTransaction = transactionService.deleteTransaction(token)

  return (
    <AuthContext.Provider
      value={{
        getTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext