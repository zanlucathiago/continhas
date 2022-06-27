import './index.css'
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { Stack } from '@mui/material';

function App() {
  return (
    <Router>
      <Container>
        <Stack spacing={2}>
          {/* <Header /> */}
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Stack>
      </Container>
    </Router>
  )
}

export default App