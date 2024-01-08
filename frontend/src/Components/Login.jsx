import React, { useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';
import {Image} from '@mui/icons-material';
import app from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import logo from '../assets/logo.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(getAuth(app), email, password);
      // Login successful, do something here (e.g., redirect to home page)
    } catch (error) {
      console.log(error);
      // Handle login error here
    }
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "100vw", height: "100vh"}} >
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "10vw", height: "10vh"}} >
            <img src={logo} />
        </Box>
        <Typography variant="h4" sx={{display: "flex", alignContent: "center", flexDirection: "column"}}>Recruitment Chat</Typography>
        <Divider />
        <Box sx={{display: "flex", alignContent: "center", flexDirection: "column", padding: 1}}>
        <form onSubmit={handleLogin}>
            <label>Email:</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <label style={{paddingLeft: 10}}>Password:</label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{paddingRight: 10}}
            />
            <button type="submit" style={{padding: 10}} >Login</button>
        </form>
    </Box>
    </Box>   
  );
};

export default Login;
