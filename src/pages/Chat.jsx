import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { getMockCurrentUser } from '../utils/mockAuth';
import ConversationList from '../components/chat/ConversationList';
import ChatWindow from '../components/chat/ChatWindow';
import chatService from '../services/ChatService.jsx';

const Chat = () => {
  const [conversations, setConversations] = useState([
    {
      id: 'c1',
      name: 'John Doe',
      lastMessage: 'Hey, I have a question about the project',
      lastMessageTime: '10:30 AM',
      unread: 2,
      isOnline: true
    },
    {
      id: 'f1',
      name: 'Jane Smith',
      lastMessage: 'The designs look great!',
      lastMessageTime: 'Yesterday',
      unread: 0,
      isOnline: false
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const currentUser = getMockCurrentUser();

  useEffect(() => {
    if (currentUser) {
      // Connect to chat service when component mounts
      chatService.connect(currentUser.id);

      // Cleanup on unmount
      return () => {
        chatService.disconnect();
      };
    }
  }, [currentUser]);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    // Mark conversation as read
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === conversation.id
          ? { ...conv, unread: 0 }
          : conv
      )
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height: 'calc(100vh - 100px)' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12} md={4} sx={{ height: '100%' }}>
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversation?.id}
            onSelect={handleConversationSelect}
          />
        </Grid>
        <Grid item xs={12} md={8} sx={{ height: '100%' }}>
          {selectedConversation ? (
            <ChatWindow
              recipientId={selectedConversation.id}
              recipientName={selectedConversation.name}
            />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;