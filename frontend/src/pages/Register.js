import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, Alert, Fade, Grow } from '@mui/material';
import { keyframes } from '@emotion/react';

// Animation keyframes
const subtlePulse = keyframes`
  0% { opacity: 0.95; }
  50% { opacity: 1; }
  100% { opacity: 0.95; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
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
      setErrorMessage(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative elements */}
      <Box sx={{
        position: 'absolute',
        width: '60vw',
        height: '60vw',
        maxWidth: 600,
        maxHeight: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(100,115,255,0.08) 0%, rgba(0,0,0,0) 70%)',
        top: '-20%',
        right: '-10%',
        animation: `${floatAnimation} 8s ease-in-out infinite`,
      }} />
      <Box sx={{
        position: 'absolute',
        width: '40vw',
        height: '40vw',
        maxWidth: 400,
        maxHeight: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,100,100,0.06) 0%, rgba(0,0,0,0) 70%)',
        bottom: '-15%',
        left: '-10%',
        animation: `${floatAnimation} 10s ease-in-out infinite 2s`,
      }} />

      <Container maxWidth="sm">
        <Grow in={true} timeout={800}>
          <Paper sx={{
            p: 4,
            bgcolor: "rgba(255, 255, 255, 0.96)",
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(50, 50, 93, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.02)',
            position: 'relative',
            overflow: 'hidden',
            animation: `${subtlePulse} 6s ease infinite`,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              background: 'linear-gradient(90deg, #6473ff, #8b4dff)',
            }
          }}>
            <Fade in={true} timeout={1000}>
              <Box>
                <Typography 
                  variant="h4" 
                  textAlign="center" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700, 
                    color: "#2d3748",
                    mb: 3,
                    letterSpacing: '-0.5px',
                  }}
                >
                  Create Account
                </Typography>
                
                {errorMessage && (
                  <Fade in={!!errorMessage}>
                    <Alert severity="error" sx={{ 
                      mb: 3, 
                      borderRadius: 2,
                      bgcolor: '#fff5f5',
                      border: '1px solid #fed7d7',
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
                          borderColor: 'rgba(0, 0, 0, 0.08)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#6473ff',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#6473ff',
                          boxShadow: '0 0 0 3px rgba(100, 115, 255, 0.2)',
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
                          borderColor: 'rgba(0, 0, 0, 0.08)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#6473ff',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#6473ff',
                          boxShadow: '0 0 0 3px rgba(100, 115, 255, 0.2)',
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
                          borderColor: 'rgba(0, 0, 0, 0.08)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#6473ff',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#6473ff',
                          boxShadow: '0 0 0 3px rgba(100, 115, 255, 0.2)',
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
                      background: 'linear-gradient(135deg, #6473ff 0%, #8b4dff 100%)',
                      borderRadius: 2,
                      py: 1.5,
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: '0 4px 6px rgba(100, 115, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 12px rgba(100, 115, 255, 0.3)',
                        background: 'linear-gradient(135deg, #5a69e6 0%, #7e44e6 100%)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                      '&.Mui-disabled': {
                        background: '#e2e8f0',
                        color: '#a0aec0',
                      }
                    }}
                  >
                    {isLoading ? 'Creating Account...' : 'Register'}
                  </Button>
                </form>
                
                <Typography variant="body2" align="center" mt={3} sx={{ 
                  color: '#718096',
                  fontSize: '0.875rem',
                }}>
                  Already have an account?{' '}
                  <Button
                    component="button"
                    onClick={() => navigate('/login')}
                    sx={{ 
                      color: '#6473ff', 
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      p: 0,
                      minWidth: 'auto',
                      '&:hover': {
                        textDecoration: 'underline',
                        background: 'none',
                      }
                    }}
                  >
                    Sign in
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
