import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, Alert, Fade, Grow } from '@mui/material';
import { keyframes } from '@emotion/react';

// Animation keyframes
const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    
    try {
      const res = await axios.post('https://expensetracker-backend-kfz1.onrender.com/api/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message === 'User already exists' 
        ? 'User already exists' 
        : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ffffff 0%, #e6f2ff 25%, #1e90ff 50%, #000000 100%)",
      backgroundSize: "400% 400%",
      animation: `${gradientFlow} 15s ease infinite`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(2px)',
      }
    }}>
      {/* Floating animated elements */}
      <Box sx={{
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,144,255,0.15) 0%, rgba(255,255,255,0) 70%)',
        top: '20%',
        left: '10%',
        animation: `${floatAnimation} 8s ease-in-out infinite`,
      }} />
      <Box sx={{
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%)',
        bottom: '15%',
        right: '10%',
        animation: `${floatAnimation} 10s ease-in-out infinite 2s`,
      }} />

      <Container maxWidth="sm">
        <Grow in={true} timeout={800}>
          <Paper sx={{
            p: 4,
            bgcolor: "rgba(255, 255, 255, 0.92)",
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 5,
              background: 'linear-gradient(90deg, #1e90ff, #ffffff)',
            }
          }}>
            <Fade in={true} timeout={1000}>
              <Box>
                <Typography 
                  variant="h4" 
                  textAlign="center" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 3,
                    background: 'linear-gradient(90deg, #1e90ff, #000000)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Register
                </Typography>
                
                {errorMessage && (
                  <Fade in={!!errorMessage}>
                    <Alert severity="error" sx={{ 
                      mb: 3, 
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 0, 0, 0.2)',
                    }}>
                      {errorMessage}
                    </Alert>
                  </Fade>
                )}
                
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Full Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#1e90ff',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1e90ff',
                          boxShadow: '0 0 0 2px rgba(30, 144, 255, 0.2)',
                        },
                      },
                    }}
                  />
                  
                  <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#1e90ff',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1e90ff',
                          boxShadow: '0 0 0 2px rgba(30, 144, 255, 0.2)',
                        },
                      },
                    }}
                  />
                  
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#1e90ff',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1e90ff',
                          boxShadow: '0 0 0 2px rgba(30, 144, 255, 0.2)',
                        },
                      },
                    }}
                  />
                  
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isLoading}
                    sx={{
                      background: 'linear-gradient(135deg, #1e90ff 0%, #0066cc 100%)',
                      borderRadius: 2,
                      py: 1.5,
                      fontSize: '16px',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      boxShadow: '0 4px 6px rgba(30, 144, 255, 0.2)',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 12px rgba(30, 144, 255, 0.3)',
                      },
                      '&.Mui-disabled': {
                        background: '#e0e0e0',
                      }
                    }}
                  >
                    {isLoading ? 'Registering...' : 'Register'}
                  </Button>
                </form>
                
                <Typography variant="body2" align="center" mt={3} sx={{ 
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                }}>
                  Already have an account?{' '}
                  <Button
                    component="button"
                    onClick={() => navigate('/login')}
                    sx={{ 
                      color: '#ffffff',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                      '&:hover': {
                        color: '#1e90ff',
                        background: 'none',
                      }
                    }}
                  >
                    Login
                  </Button>
                </Typography>
              </Box>
            </Fade>
          </Paper>
        </Grow>
      </Container>
    </Box>
  );
};

export default Register;
