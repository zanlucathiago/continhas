import { createContext, useContext } from "react";
import statementService from "../features/statement/statementService";
import transactionService from "../features/transaction/transactionService";
import AlertContext from "./AlertContext";
import UserContext from "./UserContext";

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const { handleCatch } = useContext(AlertContext)
  const { user: { token } } = useContext(UserContext)

  const getTransactions = transactionService.getTransactions(token)

  const createTransaction = handleCatch(transactionService.createTransaction(token))

  const createStatement = handleCatch(statementService.createStatement(token))

  const updateTransaction = handleCatch(transactionService.updateTransaction(token))

  const deleteTransaction = handleCatch(transactionService.deleteTransaction(token))

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