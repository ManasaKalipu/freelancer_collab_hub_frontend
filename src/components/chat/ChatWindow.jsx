import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Grid,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallEndIcon from '@mui/icons-material/CallEnd';
import chatService from '../../services/ChatService.jsx';
import webRTCService from '../../services/webRTCService';

const ChatWindow = ({ recipientId, recipientName }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isCallActive, setIsCallActive] = useState(false);
  const messageContainerRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    // Initialize chat service
    chatService.onMessage((msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    // Handle call-related events
    chatService.onCallRequest(async () => {
      const confirmed = window.confirm(`${recipientName} is calling. Accept?`);
      if (confirmed) {
        await handleCallAccept();
      }
    });

    chatService.onCallAccepted(async () => {
      await initializeCall();
    });

    chatService.onCallEnded(() => {
      handleEndCall();
    });

    return () => {
      handleEndCall();
    };
  }, [recipientId, recipientName]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    chatService.sendMessage(recipientId, message);
    setMessage('');
  };

  const initializeCall = async () => {
    try {
      const localStream = await webRTCService.initializeLocalStream();
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      const peerConnection = await webRTCService.createPeerConnection();
      webRTCService.onIceCandidate = (candidate) => {
        chatService.socket.emit('ice-candidate', {
          candidate,
          recipientId
        });
      };

      setIsCallActive(true);
    } catch (error) {
      console.error('Failed to initialize call:', error);
      alert('Failed to initialize call. Please check your camera and microphone permissions.');
    }
  };

  const handleStartCall = async () => {
    try {
      await initializeCall();
      chatService.initiateCall(recipientId);
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  const handleCallAccept = async () => {
    try {
      await initializeCall();
      chatService.socket.emit('call-accepted', { recipientId });
    } catch (error) {
      console.error('Error accepting call:', error);
    }
  };

  const handleEndCall = () => {
    webRTCService.closeConnection();
    setIsCallActive(false);
    chatService.endCall(recipientId);
  };

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6">{recipientName}</Typography>
          <Typography variant="body2" color="text.secondary">Online</Typography>
        </Box>
        <IconButton color="primary" onClick={handleStartCall}>
          <VideocamIcon />
        </IconButton>
      </Box>

      {/* Messages Container */}
      <Box
        ref={messageContainerRef}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.senderId === recipientId ? 'flex-start' : 'flex-end',
              alignItems: 'flex-start',
              gap: 1
            }}
          >
            {msg.senderId === recipientId && <Avatar>{recipientName[0]}</Avatar>}
            <Paper
              sx={{
                p: 1,
                bgcolor: msg.senderId === recipientId ? 'grey.100' : 'primary.main',
                color: msg.senderId === recipientId ? 'text.primary' : 'white',
                maxWidth: '70%'
              }}
            >
              <Typography variant="body1">{msg.content}</Typography>
              <Typography variant="caption" display="block" sx={{ mt: 0.5, opacity: 0.8 }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Message Input */}
      <Box
        component="form"
        onSubmit={handleSendMessage}
        sx={{ p: 2, borderTop: 1, borderColor: 'divider', display: 'flex', gap: 1 }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton type="submit" color="primary" disabled={!message.trim()}>
          <SendIcon />
        </IconButton>
      </Box>

      {/* Video Call Dialog */}
      <Dialog
        open={isCallActive}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <Typography variant="body2" align="center">You</Typography>
            </Grid>
            <Grid item xs={6}>
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <Typography variant="body2" align="center">{recipientName}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<CallEndIcon />}
              onClick={handleEndCall}
            >
              End Call
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default ChatWindow;