import React from 'react';
import { Navigate } from 'react-router-dom';
import { getMockCurrentUser } from '../../utils/mockAuth';

const PrivateRoute = ({ children }) => {
  const currentUser = getMockCurrentUser();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check user type and redirect to appropriate dashboard if trying to access wrong one
  const path = window.location.pathname;
  if (currentUser.type === 'client' && path === '/freelancer-dashboard') {
    return <Navigate to="/client-dashboard" replace />;
  }
  if (currentUser.type === 'freelancer' && path === '/client-dashboard') {
    return <Navigate to="/freelancer-dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;