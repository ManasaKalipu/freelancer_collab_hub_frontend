import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Typography,
  Divider,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import MessageIcon from '@mui/icons-material/Message';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ isOpen, onClose, userType = 'client' }) => {
  const navigate = useNavigate();

  const freelancerMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/freelancer-dashboard' },
    { text: 'My Projects', icon: <WorkIcon />, path: '/my-projects' },
    { text: 'Messages', icon: <MessageIcon />, path: '/messages' },
    { text: 'Earnings', icon: <AccountBalanceWalletIcon />, path: '/earnings' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' }
  ];

  const clientMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/client-dashboard' },
    { text: 'Post Project', icon: <WorkIcon />, path: '/post-project' },
    { text: 'Messages', icon: <MessageIcon />, path: '/messages' },
    { text: 'Payments', icon: <AccountBalanceWalletIcon />, path: '/payments' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' }
  ];

  const menuItems = userType === 'freelancer' ? freelancerMenuItems : clientMenuItems;

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + 1,
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        {/* Client Avatar */}
        <Avatar sx={{ width: 64, height: 64, mb: 1, bgcolor: 'primary.main' }}>C</Avatar>
        <Typography variant="subtitle1" noWrap>
          John Doe
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {userType === 'freelancer' ? 'Web Developer' : 'Project Manager'}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => {
            onClose();
            navigate(item.path);
            }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
