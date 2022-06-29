import { UserProvider } from './context/UserContext'
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { Stack } from '@mui/material';
import PublicRoute from './pages/PublicRoute';
import PrivateRoute from './pages/PrivateRoute';

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <Stack spacing={2}>
            <Routes>
              <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
              <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
            </Routes>
          </Stack>
        </Router>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App