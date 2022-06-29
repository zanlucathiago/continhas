const STORAGE_KEY = 'user';

const setUser = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const getUser = () => {
  const user = localStorage.getItem(STORAGE_KEY)
  return user && JSON.parse(user)
}

const removeUser = () => {
  localStorage.removeItem(STORAGE_KEY)
}

const storageService = {
  setUser,
  getUser,
  removeUser,
}

export default storageService