import './index.css'
import './App.css'
import { Box } from '@mui/material'
import Controlpage from './components/controlpage'
import { Route, Routes } from 'react-router'
import CustomerReg from './components/CustomerReg'
import Login from './components/Login'
import Services from './components/Services'
import ViewDetails from './components/ViewDetails'
import Message from './components/Message'
import { jwtDecode } from 'jwt-decode';
import NavBar from './components/navbar'
import { useState } from 'react'


function App() {

  const [searchTerm, setSearchTerm] = useState("")
  
  const handleLogOut = () => {
        // Remove access token, refresh token, and token expiry time from localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token_expiry");
        localStorage.removeItem("user_id")
  };

  const handleLogin = (userData) => {
    const { access_token, refresh_token, user_id } = userData;
  
    // Decode the JWT token to get its expiry time
    const decodedToken = jwtDecode(access_token);
    const tokenExpiry = decodedToken.exp * 1000; // `exp` is in seconds, so convert it to milliseconds
  
    // Store the access token, refresh token, and expiry time
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("token_expiry", tokenExpiry);
    localStorage.setItem("user_id", user_id)
  };

  return (
    <Box>
      <Box display={'none'}>
        <NavBar onLogout={handleLogOut}/>
      </Box>
      
      <Routes>
        <Route path='/' element={<Controlpage setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>} />
        <Route path='/register' element={<CustomerReg/>} />
        <Route path='/login' element={<Login onLogin={handleLogin}/>} />
        <Route path='/services' element={<Services setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>} />
        <Route path='/services/:searchTerm' element={<Services/>} />
        <Route path='/details/:userId' element={<ViewDetails/>} />
        <Route path='/message/:receiverId' element={<Message/>} />
      </Routes>
    </Box>
  )
}

export default App
