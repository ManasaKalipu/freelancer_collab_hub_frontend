import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Avatar, Rating, Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RecommendationCard = ({ freelancer }) => {
  const navigate = useNavigate();

  // Default freelancer data structure
  const {
    id = 1,
    name = 'John Doe',
    title = 'Full Stack Developer',
    rating = 4.5,
    hourlyRate = 45,
    skills = ['React', 'Node.js', 'MongoDB'],
    completedProjects = 32,
    avatar = '/default-avatar.png',
    description = 'Experienced full stack developer with expertise in modern web technologies.'
  } = freelancer || {};

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={avatar}
            alt={name}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({rating})
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            ${hourlyRate}/hr · {completedProjects} Projects Completed
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          {skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              size="small"
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={() => navigate(`/freelancer/${id}`)}
        >
          View Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecommendationCard;