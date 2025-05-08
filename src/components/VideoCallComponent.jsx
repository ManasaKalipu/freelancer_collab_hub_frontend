import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { JitsiMeeting } from '@jitsi/react-sdk';
import CallEndIcon from '@mui/icons-material/CallEnd';

const VideoCallComponent = ({ roomId, onClose }) => {
  return (
    <Box sx={{ height: '80vh', position: 'relative' }}>
      <Box sx={{ 
        position: 'absolute', 
        top: 10, 
        right: 10, 
        zIndex: 1,
        display: 'flex',
        gap: 2
      }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<CallEndIcon />}
          onClick={onClose}
        >
          End Call
        </Button>
      </Box>
      <JitsiMeeting
        domain="meet.jit.si"
        roomName={`freelancer-client-${roomId}`}
        configOverwrite={{
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          prejoinPageEnabled: false
        }}
        interfaceConfigOverwrite={{
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop',
            'fullscreen', 'fodeviceselection', 'hangup', 'chat',
            'settings', 'raisehand', 'videoquality', 'filmstrip',
            'tileview'
          ]
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = '100%';
          iframeRef.style.width = '100%';
        }}
      />
    </Box>
  );
};

export default VideoCallComponent;