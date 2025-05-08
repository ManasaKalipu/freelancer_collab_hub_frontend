import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen,setIsOpen] = React.useState(false); 
  const [onClose,setOnClose] = React.useState(true);
  const [userType,setUserType] = React.useState(false);
  const handleLogout = () => {
    // TODO: Implement logout logic
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Freelancer Hub
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isOpen  ? (
            <>
              <Sidebar />
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;