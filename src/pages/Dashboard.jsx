import React from 'react';
import ChatRoom from '../components/ChatRoom';

const Dashboard = () => {
  const currentUser = {
    uid: 'current-user-id',
    displayName: 'John Doe'
  };
  
  const otherUser = {
    uid: 'other-user-id',
    displayName: 'Jane Smith'
  };

  return (
    <ChatRoom 
      currentUser={currentUser} 
      otherUser={otherUser} 
    />
  );
};

export default Dashboard;