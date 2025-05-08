import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const ProjectList = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Website Development',
      description: 'Need a full-stack developer for an e-commerce website',
      budget: 5000,
      skills: ['React', 'Node.js', 'MongoDB'],
      status: 'Open'
    }
  ]);

  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    budget: '',
    skills: ''
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const projectToAdd = {
      id: projects.length + 1,
      ...newProject,
      skills: newProject.skills.split(',').map(skill => skill.trim()),
      status: 'Open'
    };
    setProjects([...projects, projectToAdd]);
    setNewProject({ title: '', description: '', budget: '', skills: '' });
    handleClose();
  };

  return (
    <Container sx={{ py: 4 }}>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ mb: 4 }}
      >
        Post New Project
      </Button>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Typography variant="body2">
                  Budget: ${project.budget}
                </Typography>
                <Typography variant="body2">
                  Skills: {project.skills.join(', ')}
                </Typography>
                <Typography variant="body2" color="primary">
                  Status: {project.status}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Post a New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Project Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newProject.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Project Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newProject.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="budget"
            label="Budget ($)"
            type="number"
            fullWidth
            variant="outlined"
            value={newProject.budget}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="skills"
            label="Required Skills (comma-separated)"
            type="text"
            fullWidth
            variant="outlined"
            value={newProject.skills}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Post Project</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectList;