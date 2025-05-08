import React from 'react';
import { Container, Typography, Button, Grid, Box, Card, CardContent, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';
import PaymentIcon from '@mui/icons-material/Payment';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      title: 'Post a Project',
      description: 'Describe your project and receive proposals from skilled freelancers.'
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: 'Find Talent',
      description: 'Browse through our pool of qualified freelancers and find the perfect match.'
    },
    {
      icon: <PaymentIcon sx={{ fontSize: 40 }} />,
      title: 'Secure Payments',
      description: 'Safe and secure payment system with milestone-based releases.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Find the Perfect Freelance Services
              </Typography>
              <Typography variant="h5" paragraph>
                Connect with talented freelancers and get your projects done efficiently.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/how-it-works')}
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Add hero image here */}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2, color: 'primary.main' }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" paragraph>
              Join our community of freelancers and clients today.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ mt: 2 }}
            >
              Sign Up Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;