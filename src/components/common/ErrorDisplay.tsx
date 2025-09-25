import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { spacing } from '../../theme/theme';

export interface ErrorDisplayProps {
  error?: string;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error = 'Something went wrong',
  onRetry,
}) => {
  const handleHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        p: spacing.component.pageMargin,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
      }}
    >
      <ErrorIcon 
        sx={{ 
          fontSize: 64,
          color: 'error.main',
          mb: spacing.lg,
          opacity: 0.6,
        }} 
      />
      
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          mb: spacing.lg,
        }}
      >
        Something went wrong
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          mb: spacing.xl,
          maxWidth: 400,
        }}
      >
        {error}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: spacing.lg,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
        }}
      >
        {onRetry && (
          <Button
            variant="contained"
            onClick={onRetry}
            sx={{
              minHeight: spacing.minSizes.touchTarget,
              px: spacing.component.buttonPadding,
            }}
          >
            Try Again
          </Button>
        )}

        <Button
          variant={onRetry ? 'outlined' : 'contained'}
          startIcon={<HomeIcon />}
          onClick={handleHomeClick}
          sx={{
            minHeight: spacing.minSizes.touchTarget,
            px: spacing.component.buttonPadding,
          }}
        >
          Go Home
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorDisplay;