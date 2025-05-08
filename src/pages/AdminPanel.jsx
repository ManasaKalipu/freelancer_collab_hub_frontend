import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminPanel = () => {
  // Mock data for analytics
  const userStats = [
    { month: 'Jan', freelancers: 120, clients: 80 },
    { month: 'Feb', freelancers: 150, clients: 95 },
    { month: 'Mar', freelancers: 180, clients: 110 },
    { month: 'Apr', freelancers: 220, clients: 130 },
    { month: 'May', freelancers: 250, clients: 150 },
    { month: 'Jun', freelancers: 280, clients: 170 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: 22000 },
    { month: 'May', revenue: 25000 },
    { month: 'Jun', revenue: 28000 },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', type: 'Freelancer', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', type: 'Client', status: 'Active', joinDate: '2024-01-16' },
    { id: 3, name: 'Mike Johnson', type: 'Freelancer', status: 'Pending', joinDate: '2024-01-17' },
    { id: 4, name: 'Sarah Wilson', type: 'Client', status: 'Active', joinDate: '2024-01-18' },
  ];

  const handleUserAction = (userId, action) => {
    console.log(`${action} user ${userId}`);
    // TODO: Implement user management actions
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h4">450</Typography>
              <Typography variant="body2" color="text.secondary">
                280 Freelancers, 170 Clients
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Projects
              </Typography>
              <Typography variant="h4">85</Typography>
              <Typography variant="body2" color="text.secondary">
                +12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Monthly Revenue
              </Typography>
              <Typography variant="h4">$28K</Typography>
              <Typography variant="body2" color="text.secondary">
                +15% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Success Rate
              </Typography>
              <Typography variant="h4">92%</Typography>
              <Typography variant="body2" color="text.secondary">
                Project completion rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              User Growth
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="freelancers" fill="#8884d8" name="Freelancers" />
                  <Bar dataKey="clients" fill="#82ca9d" name="Clients" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Overview
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Users Table */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Users
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.type}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        bgcolor: user.status === 'Active' ? 'success.light' : 'warning.light',
                        color: user.status === 'Active' ? 'success.dark' : 'warning.dark',
                        px: 1,
                        borderRadius: 1,
                        display: 'inline-block'
                      }}
                    >
                      {user.status}
                    </Box>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => handleUserAction(user.id, 'view')}
                    >
                      View
                    </Button>
                    {user.status === 'Pending' && (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleUserAction(user.id, 'approve')}
                      >
                        Approve
                      </Button>
                    )}
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleUserAction(user.id, 'suspend')}
                    >
                      Suspend
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AdminPanel;