import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PostProject = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    duration: '',
    skills: [],
    attachments: []
  });

  const categories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Content Writing',
    'Digital Marketing',
    'Data Science',
    'Other'
  ];

  const skillOptions = [
    'React',
    'Node.js',
    'Python',
    'Java',
    'JavaScript',
    'HTML/CSS',
    'UI Design',
    'UX Design',
    'Content Writing',
    'SEO'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillChange = (e) => {
    setProjectData(prev => ({
      ...prev,
      skills: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement project posting logic
    console.log('Project Data:', projectData);
    navigate('/client-dashboard');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Post a New Project
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            label="Project Title"
            name="title"
            value={projectData.title}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label="Project Description"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            margin="normal"
            helperText="Describe your project requirements in detail"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={projectData.category}
              label="Category"
              name="category"
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Required Skills</InputLabel>
            <Select
              multiple
              value={projectData.skills}
              label="Required Skills"
              name="skills"
              onChange={handleSkillChange}
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

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <TextField
              required
              fullWidth
              label="Budget ($)"
              name="budget"
              type="number"
              value={projectData.budget}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0 } }}
            />

            <TextField
              required
              fullWidth
              label="Duration (days)"
              name="duration"
              type="number"
              value={projectData.duration}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Box>

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Post Project
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/client-dashboard')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostProject;