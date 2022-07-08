import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorSnackbar from "./components/ErrorSnackbar";
import { AlertProvider } from './context/AlertContext';
import { UserProvider } from './context/UserContext';
import './index.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import PublicRoute from './pages/PublicRoute';
import Register from './pages/Register';

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <ErrorSnackbar />
        <CssBaseline />
        <Router>
          <UserProvider>
            <Routes>
              <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
              <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
            </Routes>
          </UserProvider>
        </Router>
      </AlertProvider>
    </ThemeProvider>
  )
}

export default App