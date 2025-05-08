import React, { useState } from 'react';
import { Container, Grid, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, Chip, Stack } from '@mui/material';
import RecommendationCard from '../components/RecommendationCard';

const RecommendFreelancers = () => {
  const [filters, setFilters] = useState({
    skills: [],
    experience: 'all',
    hourlyRate: 'all'
  });

  // Mock data for recommended freelancers
  const freelancers = [
    {
      id: 1,
      name: 'John Doe',
      title: 'Full Stack Developer',
      rating: 4.8,
      hourlyRate: 45,
      skills: ['React', 'Node.js', 'MongoDB'],
      completedProjects: 32,
      description: 'Experienced full stack developer with expertise in modern web technologies.'
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'UI/UX Designer',
      rating: 4.9,
      hourlyRate: 55,
      skills: ['Figma', 'Adobe XD', 'UI Design'],
      completedProjects: 28,
      description: 'Creative UI/UX designer with a passion for creating beautiful and functional interfaces.'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      title: 'Mobile Developer',
      rating: 4.7,
      hourlyRate: 50,
      skills: ['React Native', 'iOS', 'Android'],
      completedProjects: 25,
      description: 'Mobile app developer specializing in cross-platform development using React Native.'
    }
  ];

  const skillOptions = [
    'React',
    'Node.js',
    'MongoDB',
    'UI Design',
    'UX Design',
    'React Native',
    'iOS',
    'Android',
    'Python',
    'Java'
  ];

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter freelancers based on selected criteria
  const filteredFreelancers = freelancers.filter(freelancer => {
    if (filters.skills.length > 0) {
      const hasRequiredSkills = filters.skills.every(skill =>
        freelancer.skills.includes(skill)
      );
      if (!hasRequiredSkills) return false;
    }

    if (filters.hourlyRate !== 'all') {
      const [min, max] = filters.hourlyRate.split('-').map(Number);
      if (freelancer.hourlyRate < min || freelancer.hourlyRate > max) return false;
    }

    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Recommended Freelancers
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Skills</InputLabel>
              <Select
                multiple
                value={filters.skills}
                label="Skills"
                name="skills"
                onChange={handleFilterChange}
                renderValue={(selected) => (
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {selected.map((skill) => (
                      <Chip key={skill} label={skill} />
                    ))}
                  </Stack>
                )}
              >
                {skillOptions.map((skill) => (
                  <MenuItem key={skill} value={skill}>
                    {skill}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Hourly Rate</InputLabel>
              <Select
                value={filters.hourlyRate}
                label="Hourly Rate"
                name="hourlyRate"
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All Rates</MenuItem>
                <MenuItem value="0-25">$0 - $25</MenuItem>
                <MenuItem value="25-50">$25 - $50</MenuItem>
                <MenuItem value="50-100">$50 - $100</MenuItem>
                <MenuItem value="100-150">$100 - $150</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Experience Level</InputLabel>
              <Select
                value={filters.experience}
                label="Experience Level"
                name="experience"
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All Levels</MenuItem>
                <MenuItem value="entry">Entry Level</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="expert">Expert</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Freelancer Cards */}
      <Grid container spacing={3}>
        {filteredFreelancers.map((freelancer) => (
          <Grid item xs={12} sm={6} md={4} key={freelancer.id}>
            <RecommendationCard freelancer={freelancer} />
          </Grid>
        ))}
      </Grid>

      {filteredFreelancers.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No freelancers found matching your criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default RecommendFreelancers;