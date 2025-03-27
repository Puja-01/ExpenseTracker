import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, Alert } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const res = await axios.post('https://expensetracker-backend-kfz1.onrender.com/api/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'User already exists');
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "#f5f5f5", // Light gray background
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Container maxWidth="sm">
        <Paper sx={{
          p: 4,
          bgcolor: "#ffffff", // White background for form container
          borderRadius: 3,
          boxShadow: 3,
        }}>
          <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', color: "#333" }}>
            Register
          </Typography>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errorMessage}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1, mb: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1, mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1, mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#1976D2',
                '&:hover': { bgcolor: '#1565C0' },
                py: 1.5,
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: 2,
              }}
            >
              Register
            </Button>
          </form>
          <Typography variant="body2" align="center" mt={2} sx={{ color: '#333' }}>
            Already have an account?{' '}
            <Button
              component="button"
              onClick={() => navigate('/login')}
              sx={{ color: '#1976D2', textTransform: 'none' }}
            >
              Login
            </Button>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
