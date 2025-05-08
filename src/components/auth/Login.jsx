import React, { useState } from 'react';
import { Box, Tabs, Tab, Container } from '@mui/material';
import ClientLogin from './ClientLogin';
import FreelancerLogin from './FreelancerLogin';

const Login = () => {
  const [userType, setUserType] = useState('client');

  const handleChange = (event, newValue) => {
    setUserType(newValue);
    console.log(userType);
    
    localStorage.setItem('userType', newValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Tabs
          value={userType}
          onChange={handleChange}
          variant="fullWidth"
          sx={{ mb: 3, width: '100%', bgcolor: 'background.paper' }}
        >
          <Tab label="Client" value="client" />
          <Tab label="Freelancer" value="freelancer" />
        </Tabs>
        {userType === 'client' ? <ClientLogin /> : <FreelancerLogin />}
      </Box>
    </Container>
  );
};

export default Login;
