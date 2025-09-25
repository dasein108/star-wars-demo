/**
 * Reusable component style patterns
 * Common styling patterns used across multiple components
 */

import { SxProps, Theme } from '@mui/material/styles';

export const componentStyles = {
  // Card patterns
  interactiveCard: {
    height: '100%',
    display: 'flex', 
    flexDirection: 'column',
    transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
    '&:hover': {
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.4), 0 10px 10px rgba(0, 0, 0, 0.3)',
      transform: 'translateY(-2px)',
    },
  } as SxProps<Theme>,
  
  staticCard: {
    '&:hover': { 
      boxShadow: 'inherit',
      transform: 'none' 
    },
    transition: 'none'
  } as SxProps<Theme>,

  // Typography patterns
  ellipsisText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as SxProps<Theme>,
  
  multiLineEllipsis: (lines: number = 2) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
  }) as SxProps<Theme>,

  // Form patterns
  formField: {
    minWidth: 120,
  } as SxProps<Theme>,
  
  // Touch targets
  touchTarget: {
    minHeight: 44,
  } as SxProps<Theme>,

  // Animation patterns
  hoverLift: {
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-1px)',
    },
  } as SxProps<Theme>,

  pulseAnimation: {
    animation: 'pulse 1.5s ease-in-out infinite',
    '@keyframes pulse': {
      '0%': { opacity: 1 },
      '50%': { opacity: 0.4 },
      '100%': { opacity: 1 },
    },
  } as SxProps<Theme>,

  // Status chip styles
  statusChip: {
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'center',
  } as SxProps<Theme>,

  // Loading patterns
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
  } as SxProps<Theme>,

  // Button patterns
  primaryButton: {
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
    '&:hover': {
      bgcolor: 'primary.dark',
    },
    '&:disabled': {
      bgcolor: 'action.disabledBackground',
      color: 'action.disabled',
    },
  } as SxProps<Theme>,
} as const;