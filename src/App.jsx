import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import PrivateRoute from './components/auth/PrivateRoute';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProjectList from './components/projects/ProjectList';
import Home from './components/home/Home';
import FreelancerDashboard from './pages/FreelancerDashboard';
import ClientDashboard from './pages/ClientDashboard';
import PostProject from './pages/PostProject';
import Chat from './pages/Chat';
import CollaborationPost from './pages/CollaborationPost';
import AdminPanel from './pages/AdminPanel';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Box sx={{ display: 'flex' }}>
                  <Header userType={userType} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                  <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} userType={userType} />
                  <Box
                    component="main"
                    sx={{
                      flexGrow: 1,
                      p: 3,
                      width: { sm: `calc(100% - 240px)` },
                      mt: 8,
                    }}
                  >
                    <Routes>
                      <Route path="projects" element={<ProjectList />} />
                      <Route path="freelancer-dashboard" element={<FreelancerDashboard />} />
                      <Route path="client-dashboard" element={<ClientDashboard />} />
                      <Route path="post-project" element={<PostProject />} />
                      <Route path="chat" element={<Chat />} />
                      <Route path="collaboration-post" element={<CollaborationPost />} />
                      <Route path="admin" element={<AdminPanel />} />
                    </Routes>
                  </Box>
                </Box>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
