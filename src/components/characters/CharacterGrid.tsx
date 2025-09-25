import React from 'react';
import {
  Box,
  Typography,
  Alert,
} from '@mui/material';
import { Character } from '../../types/generated/swapi';
import CharacterCard from './CharacterCard';
import { CharacterGridSkeleton } from '../common/Loading';
import { StaggeredList } from '../common/Animations';
import { spacing } from '../../theme/theme';
import { layouts } from '../../theme/layouts';

interface CharacterGridProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
  onCharacterClick: (character: Character) => void;
}

const EmptyState: React.FC<{ searchQuery?: string }> = ({ searchQuery }) => (
  <Box
    sx={[
      layouts.centerText,
      {
        py: spacing.component.pageMargin,
        px: spacing.component.sectionPadding,
      }
    ]}
  >
    <Typography 
      variant="h5" 
      color="text.secondary" 
      gutterBottom
      sx={{ 
        fontSize: { xs: '1.25rem', sm: '1.5rem' },
        mb: spacing.component.cardMargin,
      }}
    >
      {searchQuery ? 'No characters found' : 'No characters available'}
    </Typography>
    <Typography 
      variant="body1" 
      color="text.secondary"
      sx={{ 
        fontSize: { xs: '0.875rem', sm: '1rem' },
        maxWidth: '400px',
        mx: 'auto',
      }}
    >
      {searchQuery 
        ? `Try searching for a different character name.` 
        : 'Unable to load characters at this time.'
      }
    </Typography>
  </Box>
);

const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  loading,
  error,
  onCharacterClick,
}) => {
  if (error) {
    return (
      <Box sx={{ my: spacing.component.sectionMargin }}>
        <Alert 
          severity="error" 
          sx={{ 
            mb: spacing.lg,
            '& .MuiAlert-message': {
              fontSize: { xs: '0.875rem', sm: '1rem' },
            },
          }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (loading) {
    return <CharacterGridSkeleton count={12} />;
  }

  if (characters.length === 0) {
    return <EmptyState />;
  }

  const characterCards = characters.map((character) => {
    return (
      <CharacterCard 
        key={`${character.name}-${character.birth_year}`}
        character={character} 
        onClick={onCharacterClick} 
      />
    );
  });

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
      <StaggeredList staggerDelay={0.05} animation="fadeIn">
        {characterCards}
      </StaggeredList>
    </Box>
  );
};

export default CharacterGrid;