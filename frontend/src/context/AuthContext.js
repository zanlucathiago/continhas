import { createContext, useContext } from "react"
import transactionService from "../features/transaction/transactionService";
import statementService from "../features/statement/statementService";
import UserContext from "./UserContext";

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const { user: { token } } = useContext(UserContext)

  const getTransactions = transactionService.getTransactions(token)

  const createTransaction = transactionService.createTransaction(token)

  const createStatement = statementService.createStatement(token)

  const updateTransaction = transactionService.updateTransaction(token)

  const deleteTransaction = transactionService.deleteTransaction(token)

  return (
    <AuthContext.Provider
      value={{
        getTransactions,
        createTransaction,
        createStatement,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext