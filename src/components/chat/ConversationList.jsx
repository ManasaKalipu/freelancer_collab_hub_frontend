import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Badge,
  Divider,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ConversationList = ({ conversations, selectedId, onSelect }) => {
  return (
    <Paper sx={{ height: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        Messages
      </Typography>
      <List sx={{ overflow: 'auto', height: 'calc(100% - 56px)' }}>
        {conversations.map((conversation) => (
          <React.Fragment key={conversation.id}>
            <ListItem
              button
              selected={selectedId === conversation.id}
              onClick={() => onSelect(conversation)}
            >
              <ListItemAvatar>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  invisible={!conversation.isOnline}
                >
                  <Avatar>{conversation.name[0]}</Avatar>
                </StyledBadge>
              </ListItemAvatar>
              <ListItemText
                primary={conversation.name}
                secondary={conversation.lastMessage}
                primaryTypographyProps={{
                  fontSize: '1rem',
                  fontWeight: conversation.unread ? 'bold' : 'normal'
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Typography variant="caption" color="text.secondary">
                  {conversation.lastMessageTime}
                </Typography>
                {conversation.unread > 0 && (
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      mt: 0.5
                    }}
                  >
                    {conversation.unread}
                  </Box>
                )}
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default ConversationList;