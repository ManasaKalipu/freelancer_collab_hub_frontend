import React, { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import ChatComponent from './ChatComponent';
import VideoCallComponent from './VideoCallComponent';

const ChatRoom = ({ currentUser, otherUser }) => {
  const [isInCall, setIsInCall] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Chat with {otherUser.displayName}
          </Typography>
          <Button
            variant="contained"
            color={isInCall ? "error" : "primary"}
            startIcon={<VideocamIcon />}
            onClick={() => setIsInCall(!isInCall)}
          >
            {isInCall ? 'End Video Call' : 'Start Video Call'}
          </Button>
        </Box>
      </Paper>

      {isInCall ? (
        <VideoCallComponent
          roomId={`${currentUser.uid}-${otherUser.uid}`}
          onClose={() => setIsInCall(false)}
        />
      ) : (
        <ChatComponent
          currentUser={currentUser}
          otherUser={otherUser}
        />
      )}
    </Box>
  );
};

export default ChatRoom;