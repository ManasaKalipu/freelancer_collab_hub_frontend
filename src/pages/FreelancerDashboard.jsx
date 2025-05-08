import React from 'react';
import { Container, Grid, Paper, Typography, Box, List, ListItem, ListItemText, Divider, Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FreelancerDashboard = () => {
  // Mock data for the dashboard
  const earningsData = [
    { month: 'Jan', amount: 2400 },
    { month: 'Feb', amount: 1398 },
    { month: 'Mar', amount: 3200 },
    { month: 'Apr', amount: 2780 },
    { month: 'May', amount: 1890 },
    { month: 'Jun', amount: 2390 },
  ];

  const activeProjects = [
    { id: 1, title: 'E-commerce Website Development', client: 'Tech Solutions Inc.', dueDate: '2024-02-15' },
    { id: 2, title: 'Mobile App UI Design', client: 'Creative Apps LLC', dueDate: '2024-02-28' },
  ];

  const recentActivities = [
    { id: 1, activity: 'New project proposal received', time: '2 hours ago' },
    { id: 2, activity: 'Payment received for Project X', time: '5 hours ago' },
    { id: 3, activity: 'Client feedback submitted', time: '1 day ago' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Stats Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Total Earnings</Typography>
            <Typography variant="h4">$14,058</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Active Projects</Typography>
            <Typography variant="h4">2</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Completion Rate</Typography>
            <Typography variant="h4">95%</Typography>
          </Paper>
        </Grid>

        {/* Earnings Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Earnings Overview</Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Active Projects */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Active Projects</Typography>
              <List>
                {activeProjects.map((project) => (
                  <React.Fragment key={project.id}>
                    <ListItem>
                      <ListItemText
                        primary={project.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {project.client}
                            </Typography>
                            {` — Due: ${project.dueDate}`}
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
              <Typography variant="h6" gutterBottom>Recent Activities</Typography>
              <List>
                {recentActivities.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemText
                        primary={activity.activity}
                        secondary={activity.time}
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
  );
};

export default FreelancerDashboard;