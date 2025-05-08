import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Box, TextField, Button, Paper, Typography, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatComponent = ({ currentUser, otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const chatId = [currentUser.uid, otherUser.uid].sort().join('_');
    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messageList);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [currentUser, otherUser]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const chatId = [currentUser.uid, otherUser.uid].sort().join('_');
    await addDoc(collection(db, `chats/${chatId}/messages`), {
      text: newMessage,
      sender: currentUser.uid,
      timestamp: new Date(),
      senderName: currentUser.displayName
    });

    setNewMessage('');
  };

  return (
    <Paper sx={{ height: '70vh', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender === currentUser.uid ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              {message.sender !== currentUser.uid && (
                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                  {otherUser.displayName?.charAt(0)}
                </Avatar>
              )}
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: message.sender === currentUser.uid ? 'primary.main' : 'grey.100',
                  color: message.sender === currentUser.uid ? 'white' : 'text.primary',
                  maxWidth: '70%'
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {message.timestamp?.toDate().toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '8px' }}>
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          variant="outlined"
          size="small"
        />
        <Button 
          type="submit" 
          variant="contained" 
          endIcon={<SendIcon />}
          disabled={!newMessage.trim()}
        >
          Send
        </Button>
      </form>
    </Paper>
  );
};

export default ChatComponent;