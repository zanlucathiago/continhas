import { createContext, useContext } from "react";
import accountService from "../features/accountService";
import referenceService from "../features/referenceService";
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

  const getTransaction = transactionService.getTransaction(token)

  const createTransaction = handleCatch(transactionService.createTransaction(token))

  const updateTransaction = handleCatch(transactionService.updateTransaction(token))

  const deleteTransaction = handleCatch(transactionService.deleteTransaction(token))

  const getReferences = referenceService.getReferences(token)

  const getReference = referenceService.getReference(token)

  const createReference = handleCatch(referenceService.createReference(token))

  const updateReference = handleCatch(referenceService.updateReference(token))

  const deleteReference = handleCatch(referenceService.deleteReference(token))

  const getAccounts = accountService.getAccounts(token)

  const createAccount = handleCatch(accountService.createAccount(token))

  const updateAccount = handleCatch(accountService.updateAccount(token))

  const deleteAccount = handleCatch(accountService.deleteAccount(token))

  return (
    <AuthContext.Provider
      value={{
        createStatement,
        getTransactions,
        getTransaction,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        getReferences,
        getReference,
        createReference,
        updateReference,
        deleteReference,
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