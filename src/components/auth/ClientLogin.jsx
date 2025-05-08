import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { mockLogin, setMockUser } from '../../utils/mockAuth';

const ClientLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { user, token } = await mockLogin(formData.email, formData.password, 'client');
      setMockUser(user);
      localStorage.setItem('mockToken', token);
      navigate('/client-dashboard');
      window.location.reload(); // Ensure header updates
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h5">Client Sign In</Typography>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="companyName"
          label="Company Name"
          value={formData.companyName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="email"
          label="Business Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In as Client
        </Button>
        <Button fullWidth variant="text" onClick={() => navigate('/register')}>
          Don’t have an account? Sign Up
        </Button>
      </Box>
    </Paper>
  );
};

export default ClientLogin;
