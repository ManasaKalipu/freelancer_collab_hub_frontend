import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CollaborationPost = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectDuration: '',
    budgetMin: '',
    budgetMax: '',
    projectType: '',
    experienceLevel: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSkillAdd = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleSkillDelete = (skillToDelete) => {
    setSkills(skills.filter(skill => skill !== skillToDelete));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to save the collaboration post
    console.log({ ...formData, skills });
    navigate('/projects'); // Redirect to projects page after submission
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Collaboration Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              label="Project Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="Project Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <FormControl fullWidth required>
              <InputLabel>Project Type</InputLabel>
              <Select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                label="Project Type"
              >
                <MenuItem value="web">Web Development</MenuItem>
                <MenuItem value="mobile">Mobile Development</MenuItem>
                <MenuItem value="design">Design</MenuItem>
                <MenuItem value="writing">Content Writing</MenuItem>
                <MenuItem value="marketing">Digital Marketing</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                required
                type="number"
                label="Minimum Budget"
                name="budgetMin"
                value={formData.budgetMin}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              <TextField
                required
                type="number"
                label="Maximum Budget"
                name="budgetMax"
                value={formData.budgetMax}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Box>
            <TextField
              required
              label="Project Duration (in weeks)"
              name="projectDuration"
              type="number"
              value={formData.projectDuration}
              onChange={handleChange}
            />
            <FormControl fullWidth required>
              <InputLabel>Required Experience Level</InputLabel>
              <Select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                label="Required Experience Level"
              >
                <MenuItem value="entry">Entry Level</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="expert">Expert</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <TextField
                fullWidth
                label="Required Skills"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSkillAdd())}
              />
              <Button
                variant="outlined"
                onClick={handleSkillAdd}
                sx={{ mt: 1 }}
              >
                Add Skill
              </Button>
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleSkillDelete(skill)}
                  />
                ))}
              </Box>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Post Collaboration
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default CollaborationPost;