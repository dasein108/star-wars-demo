import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { Character } from '../types/generated/swapi';
import { useCharacters } from '../hooks/useCharacters';
import CharacterSearch from '../components/characters/CharacterSearch';
import CharacterGrid from '../components/characters/CharacterGrid';
import Pagination from '../components/characters/Pagination';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { swapiService } from '../services/api';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    characters,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    goToPage,
    retryLoad,
  } = useCharacters();

  // Handle character card click
  const handleCharacterClick = (character: Character) => {
    const characterId = swapiService.extractIdFromUrl(character.url);
    navigate(`/character/${characterId}`);
  };

  // Handle search change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Handle retry button click
  const handleRetry = () => {
    retryLoad();
  };

  return (
    <ErrorBoundary>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center' }}>
          <Box
            component="img"
            src="./images/logo.svg"
            alt="Star Wars"
            sx={{
              maxWidth: { xs: 250, sm: 350, md: 400 },
              width: '100%',
              height: 'auto',
            }}
          />
        </Box>

        {/* Search */}
        <CharacterSearch
          value={searchQuery}
          onSearchChange={handleSearchChange}
          loading={loading && characters.length === 0}
          placeholder="Search characters by name..."
        />

        {/* Error state with retry */}
        {error && characters.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="error" gutterBottom>
              Unable to load characters
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {error}
            </Typography>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleRetry}
              disabled={loading}
            >
              Try Again
            </Button>
          </Box>
        )}

        {/* Results info */}
        {!loading && !error && characters.length > 0 &&  searchQuery &&(
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
                {`Found ${characters.length} character${characters.length === 1 ? '' : 's'} matching "${searchQuery}"`}
            </Typography>
          </Box>
        )}

        {/* Character Grid */}
        <CharacterGrid
          characters={characters}
          loading={loading && characters.length === 0}
          error={characters.length === 0 ? error : null}
          onCharacterClick={handleCharacterClick}
        />

        {/* Pagination - only show for non-search results */}
        {!searchQuery && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            loading={loading}
          />
        )}
      </Container>
    </ErrorBoundary>
  );
};

export default HomePage;