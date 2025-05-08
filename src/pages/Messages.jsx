import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Button
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import LockIcon from '@mui/icons-material/Lock';
import CryptoJS from 'crypto-js';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [encryptionKey] = useState(generateEncryptionKey());
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const contacts = [
    { id: 1, name: 'John Doe', avatar: 'J', lastMessage: 'Hey, how\'s the project going?' },
    { id: 2, name: 'Alice Smith', avatar: 'A', lastMessage: 'The designs look great!' },
    { id: 3, name: 'Bob Johnson', avatar: 'B', lastMessage: 'Can we schedule a call?' }
  ];

  const chatHistory = [
    { id: 1, sender: 'John Doe', message: 'Hey, how\'s the project going?', time: '10:30 AM' },
    { id: 2, sender: 'You', message: 'It\'s going well! I\'ve completed the first phase.', time: '10:32 AM' },
    { id: 3, sender: 'John Doe', message: 'Great! Can you share the progress?', time: '10:35 AM' }
  ];

  // Generate a random encryption key
  function generateEncryptionKey() {
    return CryptoJS.lib.WordArray.random(256 / 8).toString();
  }

  // Encrypt message
  const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message, encryptionKey).toString();
  };

  // Decrypt message
  const decryptMessage = (encryptedMessage) => {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const encrypted = encryptMessage(message.trim());
      console.log('Sending encrypted message:', encrypted);
      setMessage('');
    }
  };

  const startVideoCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      setIsVideoCallActive(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  const endVideoCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    setIsVideoCallActive(false);
  };

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [localStream]);

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <Grid container spacing={2} sx={{ height: 'calc(100vh - 140px)' }}>
        {/* Contacts */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%' }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Messages</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Search contacts"
                InputProps={{ startAdornment: <SearchIcon color="action" /> }}
                sx={{ mb: 2 }}
              />
              <List>
                {contacts.map(contact => (
                  <React.Fragment key={contact.id}>
                    <ListItem
                      button
                      selected={selectedChat === contact.id}
                      onClick={() => setSelectedChat(contact.id)}
                    >
                      <ListItemAvatar><Avatar>{contact.avatar}</Avatar></ListItemAvatar>
                      <ListItemText
                        primary={contact.name}
                        secondary={contact.lastMessage}
                        secondaryTypographyProps={{ noWrap: true, style: { maxWidth: '200px' } }}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Chat Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedChat ? (
              <>
                {/* Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">
                    {contacts.find(c => c.id === selectedChat)?.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LockIcon color="success" sx={{ fontSize: 16 }} />
                    <Typography variant="caption" color="success">End-to-End Encrypted</Typography>
                    {isVideoCallActive ? (
                      <Button variant="outlined" color="error" onClick={endVideoCall} startIcon={<VideocamIcon />}>
                        End Call
                      </Button>
                    ) : (
                      <Button variant="contained" onClick={startVideoCall} startIcon={<VideocamIcon />}>
                        Video Call
                      </Button>
                    )}
                  </Box>
                </Box>

                {/* Video Call */}
                {isVideoCallActive && (
                  <Box sx={{ p: 2, display: 'flex', gap: 2, bgcolor: '#000' }}>
                    <video
                      ref={localVideoRef}
                      autoPlay
                      muted
                      style={{ width: '200px', height: '150px', borderRadius: 4 }}
                    />
                    {remoteStream && (
                      <video
                        ref={remoteVideoRef}
                        autoPlay
                        style={{ width: '100%', height: '400px' }}
                      />
                    )}
                  </Box>
                )}

                {/* Messages */}
                <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
                  {chatHistory.map(chat => (
                    <Box
                      key={chat.id}
                      sx={{ display: 'flex', justifyContent: chat.sender === 'You' ? 'flex-end' : 'flex-start', mb: 2 }}
                    >
                      <Box
                        sx={{
                          maxWidth: '70%',
                          bgcolor: chat.sender === 'You' ? 'primary.main' : 'grey.100',
                          color: chat.sender === 'You' ? 'white' : 'text.primary',
                          borderRadius: 2,
                          p: 2
                        }}
                      >
                        <Typography variant="body1">{chat.message}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>{chat.time}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Input */}
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton color="primary" onClick={handleSendMessage} disabled={!message.trim()}>
                        <SendIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" color="textSecondary">
                  Select a chat to start messaging
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Messages;
