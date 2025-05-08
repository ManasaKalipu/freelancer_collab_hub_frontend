import React from 'react';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import MarketingIcon from '@mui/icons-material/Campaign';
import WritingIcon from '@mui/icons-material/Description';
import VideoIcon from '@mui/icons-material/Videocam';
import MusicIcon from '@mui/icons-material/MusicNote';

const serviceCategories = [
  {
    id: 'programming',
    title: 'Programming & Tech',
    icon: <CodeIcon />,
    services: ['Web Development', 'Mobile Apps', 'Software Development', 'Game Development']
  },
  {
    id: 'design',
    title: 'Graphics & Design',
    icon: <BrushIcon />,
    services: ['Logo Design', 'UI/UX Design', 'Illustration', 'Brand Design']
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    icon: <MarketingIcon />,
    services: ['Social Media', 'SEO', 'Content Marketing', 'Email Marketing']
  },
  {
    id: 'writing',
    title: 'Writing & Translation',
    icon: <WritingIcon />,
    services: ['Content Writing', 'Translation', 'Technical Writing', 'Copywriting']
  },
  {
    id: 'video',
    title: 'Video & Animation',
    icon: <VideoIcon />,
    services: ['Video Editing', 'Animation', 'Motion Graphics', '3D Modeling']
  },
  {
    id: 'music',
    title: 'Music & Audio',
    icon: <MusicIcon />,
    services: ['Voice Over', 'Music Production', 'Sound Design', 'Mixing & Mastering']
  }
];

const SearchDropdown = ({ searchQuery, onServiceSelect }) => {
  const filteredCategories = searchQuery
    ? serviceCategories.map(category => ({
        ...category,
        services: category.services.filter(service =>
          service.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.services.length > 0)
    : serviceCategories;

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        maxHeight: '400px',
        overflowY: 'auto',
        mt: 1,
        zIndex: 1300
      }}
    >
      <List sx={{ p: 0 }}>
        {filteredCategories.map((category, index) => (
          <React.Fragment key={category.id}>
            {index > 0 && <Divider />}
            <ListItem sx={{ bgcolor: 'grey.100' }}>
              <ListItemIcon>{category.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {category.title}
                  </Typography>
                }
              />
            </ListItem>
            {category.services.map((service, serviceIndex) => (
              <ListItem
                key={`${category.id}-${serviceIndex}`}
                button
                onClick={() => onServiceSelect(service)}
                sx={{
                  pl: 6,
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText'
                  }
                }}
              >
                <ListItemText primary={service} />
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default SearchDropdown;