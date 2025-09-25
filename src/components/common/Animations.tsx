import React, { ReactNode } from 'react';
import {
  Box,
  Card,
  styled,
  keyframes,
} from '@mui/material';

// Keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -30px, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0,-4px,0);
  }
`;

// Styled animated components
export const FadeInCard = styled(Card)(() => ({
  animation: `${fadeIn} 0.4s ease-out`,
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

export const PulseBox = styled(Box)(() => ({
  '&.pulse': {
    animation: `${pulse} 2s infinite`,
  },
}));

export const BounceBox = styled(Box)(() => ({
  '&.bounce': {
    animation: `${bounce} 1s`,
  },
}));

// Component-based animations
interface AnimatedContainerProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'scaleIn';
  sx?: object;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  delay = 0,
  duration = 0.4,
  animation = 'fadeIn',
  sx = {},
}) => {
  const animationMap = {
    fadeIn: fadeIn,
    slideUp: slideInUp,
    slideLeft: slideInLeft,
    scaleIn: scaleIn,
  };

  return (
    <Box
      sx={{
        animation: `${animationMap[animation]} ${duration}s ease-out`,
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

// Staggered animation for lists
interface StaggeredListProps {
  children: ReactNode[];
  staggerDelay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'scaleIn';
}

export const StaggeredList: React.FC<StaggeredListProps> = ({
  children,
  staggerDelay = 0.1,
  animation = 'fadeIn',
}) => {
  return (
    <>
      {children.map((child, index) => (
        <AnimatedContainer
          key={index}
          delay={index * staggerDelay}
          animation={animation}
        >
          {child}
        </AnimatedContainer>
      ))}
    </>
  );
};

export default {
  FadeInCard,
  PulseBox,
  BounceBox,
  AnimatedContainer,
  StaggeredList,
};