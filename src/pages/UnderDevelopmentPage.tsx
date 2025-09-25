import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import {
  Construction as ConstructionIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { spacing } from '../theme/theme';

const UnderDevelopmentPage: React.FC = () => {
  const navigate = useNavigate();
  


  const handleGoHome = () => {
    navigate('/');
  };


  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Card
        sx={{
          textAlign: 'center',
          p: spacing.xxl,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <CardContent>
          {/* Construction Icon */}
          <Box sx={{ mb: 3 }}>
            <ConstructionIcon 
              sx={{ 
                fontSize: 80, 
                color: 'primary.main',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': {
                    opacity: 1,
                  },
                  '50%': {
                    opacity: 0.5,
                  },
                  '100%': {
                    opacity: 1,
                  },
                },
              }} 
            />
          </Box>

          <Typography variant="h3" component="h1" gutterBottom>
            Coming Soon!
          </Typography>

          <Typography variant="h6" color="text.secondary">
              This feature is currently under development
          </Typography>


          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: spacing.lg, justifyContent: 'center', flexWrap: 'wrap' }}>
            
            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={handleGoHome}
              size="large"
            >
              Go Home
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Container>
  );
};

export default UnderDevelopmentPage;