/**
 * Reusable layout patterns
 * Reduces repeated flexbox and grid patterns across components
 */

import { SxProps, Theme } from '@mui/material/styles';

export const layouts = {
  // Flex patterns - used 28+ times across components
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,

  flexStart: {
    display: 'flex',
    alignItems: 'flex-start',
  } as SxProps<Theme>,

  flexBetween: {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'space-between',
  } as SxProps<Theme>,

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,

  flexColumnCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as SxProps<Theme>,

  // Function for flex with gap (most common pattern)
  flexRowGap: (gap: string | number | object) => ({
    display: 'flex',
    alignItems: 'center',
    gap,
  }) as SxProps<Theme>,

  flexColumnGap: (gap: string | number | object) => ({
    display: 'flex',
    flexDirection: 'column',
    gap,
  }) as SxProps<Theme>,

  // Grid patterns
  characterGrid: {
    display: 'grid',
    gap: { xs: 2, sm: 2.5, md: 3 },
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)',
    },
  } as SxProps<Theme>,

  characterDetailGrid: {
    display: 'grid', 
    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, 
    alignItems: 'start',
  } as SxProps<Theme>,

  // Full height patterns
  fullHeight: {
    height: '100%',
  } as SxProps<Theme>,

  fullHeightFlex: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,

  // Centering patterns
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
  } as SxProps<Theme>,

  centerText: {
    textAlign: 'center',
  } as SxProps<Theme>,
} as const;