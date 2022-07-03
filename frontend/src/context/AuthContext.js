import { createContext, useContext } from "react";
import accountService from "../features/accountService";
import statementService from "../features/statementService";
import transactionService from "../features/transactionService";
import AlertContext from "./AlertContext";
import UserContext from "./UserContext";

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const { handleCatch } = useContext(AlertContext)
  const { user: { token } } = useContext(UserContext)

  const createStatement = handleCatch(statementService.createStatement(token))

  const getTransactions = transactionService.getTransactions(token)

  const createTransaction = handleCatch(transactionService.createTransaction(token))

  const updateTransaction = handleCatch(transactionService.updateTransaction(token))

  const deleteTransaction = handleCatch(transactionService.deleteTransaction(token))

  const getAccounts = accountService.getAccounts(token)

  const createAccount = handleCatch(accountService.createAccount(token))

  const updateAccount = handleCatch(accountService.updateAccount(token))

  const deleteAccount = handleCatch(accountService.deleteAccount(token))

  return (
    <AuthContext.Provider
      value={{
        createStatement,
        getTransactions,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        getAccounts,
        createAccount,
        updateAccount,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext