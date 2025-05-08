import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  IconButton,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import MarketingIcon from '@mui/icons-material/Campaign';
import TranslateIcon from '@mui/icons-material/Translate';
import VideoIcon from '@mui/icons-material/VideoLibrary';
import AIIcon from '@mui/icons-material/Psychology';
import MusicIcon from '@mui/icons-material/MusicNote';
import BusinessIcon from '@mui/icons-material/Business';
import ConsultingIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';
import SearchDropdown from '../SearchDropdown';

const categories = [
  { title: 'Programming & Tech', icon: CodeIcon },
  { title: 'Graphics & Design', icon: BrushIcon },
  { title: 'Digital Marketing', icon: MarketingIcon },
  { title: 'Writing & Translation', icon: TranslateIcon },
  { title: 'Video & Animation', icon: VideoIcon },
  { title: 'AI Services', icon: AIIcon },
  { title: 'Music & Audio', icon: MusicIcon },
  { title: 'Business', icon: BusinessIcon },
  { title: 'Consulting', icon: ConsultingIcon },
];

const popularServices = [
  { title: 'Website Development', image: '🌐', color: '#2E7D32' },
  { title: 'Logo Design', image: '🎨', color: '#FF5722' },
  { title: 'SEO Services', image: '📈', color: '#1B5E20' },
  { title: 'Content Writing', image: '✍️', color: '#4A148C' },
  { title: 'Video Editing', image: '🎥', color: '#B71C1C' },
  { title: 'Social Media Marketing', image: '📱', color: '#827717' },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/services/${searchQuery.toLowerCase().replace(/ /g, '-')}`);
      setSearchQuery('');
      setShowDropdown(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: 4 }}>
      <Navbar />
      <Container maxWidth="lg">
        {/* Hero Section with Search */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Find the perfect freelance service
          </Typography>
          <Box sx={{ position: 'relative', maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for any service..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              sx={{ bgcolor: 'white' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {showDropdown && (
              <SearchDropdown
                searchQuery={searchQuery}
                onServiceSelect={(service) => {
                  navigate(`/services/${service.toLowerCase().replace(/ /g, '-')}`);
                  setSearchQuery('');
                  setShowDropdown(false);
                }}
              />
            )}
          </Box>
        </Box>

        {/* Categories Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Browse by category
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Grid item xs={6} sm={4} md={2} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.2s',
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Icon sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="body2">{category.title}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Popular Services Section */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Popular services
          </Typography>
          <Grid container spacing={3}>
            {popularServices.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    bgcolor: service.color,
                    color: 'white',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h2" sx={{ mb: 2 }}>
                      {service.image}
                    </Typography>
                    <Typography variant="h6">{service.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
