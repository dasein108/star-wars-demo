/**
 * Consolidated loading and skeleton components
 */

import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Skeleton,
  Card,
  CardContent,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { spacing } from '../../theme/theme';
import { layouts } from '../../theme/layouts';
import { componentStyles } from '../../theme/componentStyles';

// Loading animation keyframes
const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const StyledLoadingContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: spacing.xxl,
  minHeight: '200px',
}));

const StyledLoadingText = styled(Typography)(() => ({
  marginTop: spacing.lg,
  color: 'rgba(148, 163, 184, 1)',
  animation: `${pulse} 1.5s ease-in-out infinite`,
}));

// Loading component props
export interface LoadingProps {
  /** Loading message to display */
  message?: string;
  /** Size of the loading spinner */
  size?: number | string;
  /** Whether to show as inline loading */
  inline?: boolean;
  /** Custom color for the spinner */
  color?: 'primary' | 'secondary' | 'inherit';
  /** Minimum height for the loading container */
  minHeight?: number | string;
}

/**
 * Basic loading spinner with optional message
 */
export const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  size = 40,
  inline = false,
  color = 'primary',
  minHeight = '200px',
}) => {
  if (inline) {
    return (
      <Box display="flex" alignItems="center" gap={spacing.lg}>
        <CircularProgress size={size} color={color} />
        {message && (
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <StyledLoadingContainer minHeight={minHeight}>
      <CircularProgress size={size} color={color} />
      {message && (
        <StyledLoadingText variant="body1">
          {message}
        </StyledLoadingText>
      )}
    </StyledLoadingContainer>
  );
};

// Character Card Skeleton
export const CharacterCardSkeleton: React.FC = () => {
  return (
    <Card 
      sx={[
        layouts.fullHeightFlex,
        {
          minHeight: { xs: 200, sm: 220 },
          maxWidth: { xs: '100%', sm: 280 },
          mx: { xs: spacing.none, sm: 'auto' },
        }
      ]}
    >
      <CardContent 
        sx={[
          layouts.fullHeightFlex,
          { 
            flexGrow: 1, 
            p: spacing.component.cardPadding,
            '&:last-child': { pb: spacing.component.cardPadding },
          }
        ]}
      >
        {/* Avatar and Characteristics Side by Side */}
        <Box 
          sx={[
            layouts.flexStart,
            {
              gap: spacing.component.cardGap,
              mb: spacing.component.cardMargin,
            }
          ]}
        >
          {/* Avatar on the left */}
          <Box sx={{ flexShrink: 0 }}>
            <Skeleton 
              variant="circular" 
              width={{ xs: 60, sm: 80 }}
              height={{ xs: 60, sm: 80 }}
              animation="wave"
            />
          </Box>

          {/* Characteristics on the right */}
          <Box 
            sx={[
              layouts.flexColumnGap(spacing.component.iconGap),
              {
                flex: 1,
                justifyContent: 'flex-start',
              }
            ]}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Box key={index} sx={[layouts.flexRowGap(spacing.component.iconGap), { minHeight: 16 }]}>
                <Skeleton variant="circular" width={12} height={12} animation="wave" sx={{ flexShrink: 0 }} />
                <Skeleton 
                  variant="text" 
                  width={`${50 + Math.random() * 40}%`} 
                  height={14}
                  animation="wave"
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Character Name at bottom */}
        <Skeleton 
          variant="text" 
          width="85%" 
          height={24} 
          sx={[
            layouts.centerText,
            {
              mt: 'auto',
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }
          ]}
          animation="wave"
        />
      </CardContent>
    </Card>
  );
};

// Character Grid Skeleton
export const CharacterGridSkeleton: React.FC<{ count?: number }> = ({ count = 12 }) => {
  return (
    <Box sx={{
      display: 'grid',
      gap: { xs: spacing.lg, sm: 2.5, md: spacing.xl },
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
        xl: 'repeat(5, 1fr)',
      },
      mt: spacing.component.cardMargin,
      px: { xs: spacing.sm, sm: spacing.none },
      justifyItems: { xs: 'center', sm: 'stretch' },
    }}>
      {Array.from({ length: count }).map((_, index) => (
        <CharacterCardSkeleton key={index} />
      ))}
    </Box>
  );
};

// Generic Loading Skeleton
export const LoadingSkeleton: React.FC<{
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | false;
  sx?: object;
}> = ({ 
  variant = 'text', 
  width = '100%', 
  height = 20, 
  animation = 'wave',
  sx = {}
}) => {
  return (
    <Skeleton 
      variant={variant}
      width={width}
      height={height}
      animation={animation}
      sx={sx}
    />
  );
};

// Form Field Skeleton
export const FormFieldSkeleton: React.FC = () => {
  return (
    <Box sx={{ mb: spacing.lg }}>
      <Skeleton 
        variant="text" 
        width="30%" 
        height={20} 
        sx={{ mb: spacing.sm }}
        animation="wave"
      />
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={56} 
        sx={{ borderRadius: 1 }}
        animation="wave"
      />
    </Box>
  );
};

// Character Detail Skeleton
export const CharacterDetailSkeleton: React.FC = () => {
  return (
    <Card sx={componentStyles.staticCard}>
      <CardContent sx={{ p: spacing.xxl }}>
        {/* Character Name Header */}
        <Skeleton 
          variant="text" 
          width="60%" 
          height={48} 
          sx={{ fontWeight: 'bold', mb: spacing.lg }}
          animation="wave"
        />

        {/* Character Information in Three Columns */}
        <Box sx={[
          layouts.characterDetailGrid,
          { 
            gap: { xs: spacing.xl, md: spacing.xxl },
            minHeight: 'calc(100vh - 300px)'
          }
        ]}>
          {/* Left Column - Avatar */}
          <Box sx={layouts.flexColumnCenter}>
            <Skeleton 
              variant="circular" 
              width={120} 
              height={120} 
              animation="wave"
              sx={{ mb: spacing.lg }}
            />
            
            {/* Status Chips */}
            <Box sx={[componentStyles.statusChip, { gap: spacing.sm, mb: spacing.xxl }]}>
              <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 2 }} animation="wave" />
              <Skeleton variant="rectangular" width={140} height={32} sx={{ borderRadius: 2 }} animation="wave" />
            </Box>
          </Box>

          {/* Middle Column - Basic Information */}
          <Box>
            <Skeleton variant="text" width="50%" height={28} sx={{ mb: spacing.xl }} animation="wave" />
            {Array.from({ length: 5 }).map((_, index) => (
              <Box key={index} sx={[layouts.flexRowGap(spacing.lg), { mb: spacing.lg }]}>
                <Skeleton variant="circular" width={24} height={24} animation="wave" />
                <Box sx={[layouts.flexRowGap(spacing.sm), { flex: 1 }]}>
                  <Skeleton variant="text" width={100} height={24} animation="wave" sx={{ flexShrink: 0 }} />
                  <Skeleton variant="text" width={`${40 + Math.random() * 40}%`} height={24} animation="wave" />
                </Box>
              </Box>
            ))}
          </Box>

          {/* Right Column - Appearance Information */}
          <Box>
            <Skeleton variant="text" width="50%" height={28} sx={{ mb: spacing.xl }} animation="wave" />
            {Array.from({ length: 3 }).map((_, index) => (
              <Box key={index} sx={[layouts.flexRowGap(spacing.lg), { mb: spacing.lg }]}>
                <Skeleton variant="circular" width={24} height={24} animation="wave" />
                <Box sx={[layouts.flexRowGap(spacing.sm), { flex: 1 }]}>
                  <Skeleton variant="text" width={100} height={24} animation="wave" sx={{ flexShrink: 0 }} />
                  <Skeleton variant="text" width={`${30 + Math.random() * 50}%`} height={24} animation="wave" />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Export default as the main Loading component
export default Loading;