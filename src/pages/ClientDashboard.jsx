import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Box, List, ListItem, ListItemText, Divider, Card, CardContent, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const projectBudgetData = [
    { month: 'Jan', budget: 8000, spent: 6500 },
    { month: 'Feb', budget: 7500, spent: 6000 },
    { month: 'Mar', budget: 9000, spent: 7200 },
    { month: 'Apr', budget: 8500, spent: 7800 },
    { month: 'May', budget: 10000, spent: 8500 },
    { month: 'Jun', budget: 9500, spent: 8200 },
  ];

  const activeProjects = [
    { id: 1, title: 'Company Website Redesign', status: 'In Progress', budget: 8000, spent: 6500, dueDate: '2024-03-15', freelancer: 'Sarah Wilson' },
    { id: 2, title: 'Marketing Dashboard Development', status: 'Review', budget: 5000, spent: 4000, dueDate: '2024-03-28', freelancer: 'John Smith' },
  ];

  const recentActivities = [
    { id: 1, activity: 'Freelancer submitted milestone', project: 'Company Website', freelancer: 'Sarah Wilson', time: '2 hours ago' },
    { id: 2, activity: 'Project review completed', project: 'Marketing Dashboard', freelancer: 'John Smith', time: '5 hours ago' },
    { id: 3, activity: 'New milestone started', project: 'Company Website', freelancer: 'Sarah Wilson', time: '1 day ago' },
  ];

  const handlePostProject = () => {
    navigate('/post-project');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          ml: sidebarOpen ? '240px' : 0,
          transition: 'margin 0.2s',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>Client Dashboard</Typography>

          <Grid container spacing={3}>
            {/* Cards */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Investment</Typography>
                <Typography variant="h4">$25,000</Typography>
                <Typography variant="body2">Allocated: $13,000 | Available: $12,000</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Ongoing Projects</Typography>
                <Typography variant="h4">2 Projects</Typography>
                <Typography variant="body2">Working with 2 Freelancers</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Overall Progress</Typography>
                <Typography variant="h4">75%</Typography>
                <Typography variant="body2">Expected completion in 2 weeks</Typography>
              </Paper>
            </Grid>

            {/* Chart */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Project Investment Overview</Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectBudgetData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="budget" stroke="#82ca9d" name="Budget" />
                      <Line type="monotone" dataKey="spent" stroke="#8884d8" name="Spent" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            {/* Active Projects */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Active Projects</Typography>
                  <List>
                    {activeProjects.map((project) => (
                      <React.Fragment key={project.id}>
                        <ListItem>
                          <ListItemText
                            primary={project.title}
                            secondary={
                              <>
                                <Typography variant="body2">Freelancer: {project.freelancer}</Typography>
                                <Typography variant="body2">Status: {project.status} | Due: {project.dueDate}</Typography>
                                <Typography variant="body2">Investment: ${project.budget} | Spent: ${project.spent}</Typography>
                              </>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Activities */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Recent Activities</Typography>
                  <List>
                    {recentActivities.map((activity) => (
                      <React.Fragment key={activity.id}>
                        <ListItem>
                          <ListItemText
                            primary={activity.activity}
                            secondary={
                              <>
                                <Typography variant="body2">{activity.project} - {activity.freelancer}</Typography>
                                {` — ${activity.time}`}
                              </>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ClientDashboard;
