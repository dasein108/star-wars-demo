import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Breadcrumbs,
  Link,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useCharacterDetail } from '../hooks/useCharacterDetail';
import CharacterDetail from '../components/detail/CharacterDetail';
import DetailPageHeader from '../components/detail/DetailPageHeader';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { Character } from '../types/generated/swapi';
import { spacing } from '../theme/theme';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const {
    character,
    loading,
    error,
    isEditMode,
    editData,
    isDirty,
    isLocallyModified,
    lastModified,
    actions: {
      toggleEditMode,
      updateEditData,
      saveChanges,
      cancelEdit,
      resetToApiData,
      retryLoad,
    },
  } = useCharacterDetail(id);

  const handleGoBack = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave this page?'
      );
      if (!confirmLeave) return;
    }
    navigate(-1);
  };

  const handleGoHome = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave this page?'
      );
      if (!confirmLeave) return;
    }
    navigate('/');
  };

  // Validation helper
  const validateEditData = (data: Partial<Character>) => {
    const errors: Record<string, string> = {};
    
    if (!data.name?.trim()) {
      errors.name = 'Name is required';
    }
    
    if (data.height && data.height !== 'unknown' && data.height.trim()) {
      const height = parseInt(data.height, 10);
      if (isNaN(height)) {
        errors.height = 'Height must be a number';
      }
    }
    
    if (data.mass && data.mass !== 'unknown' && data.mass.trim()) {
      const mass = parseInt(data.mass, 10);
      if (isNaN(mass)) {
        errors.mass = 'Mass must be a number';
      }
    }
    
    return errors;
  };

  // Handle save with validation
  const handleSave = async () => {
    const errors = validateEditData(editData);
    if (Object.keys(errors).length > 0) {
      alert('Please fix the validation errors before saving.');
      return;
    }
    
    try {
      await saveChanges();
    } catch (err) {
      console.error('Failed to save:', err);
      alert('Failed to save changes. Please try again.');
    }
  };

  // Handle invalid character ID
  if (!id) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Invalid character ID. Please check the URL and try again.
        </Alert>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={handleGoHome}
        >
          Go to Home
        </Button>
      </Container>
    );
  }

  // Handle character not found
  if (!loading && error && error.includes('not found')) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link
              component="button"
              underline="hover"
              color="inherit"
              onClick={handleGoHome}
              sx={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}
            >
              <HomeIcon fontSize="small" />
              Characters
            </Link>
            <Typography color="text.primary">Not Found</Typography>
          </Breadcrumbs>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{ mb: 3 }}
          >
            Go Back
          </Button>
        </Box>

        <Alert severity="error" sx={{ mb: 3 }}>
          Character #{id} not found. The character may not exist or there may be a network issue.
        </Alert>

        <Box sx={{ display: 'flex', gap: spacing.lg }}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={retryLoad}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    );
  }

  // Handle general errors
  if (!loading && error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link
              component="button"
              underline="hover"
              color="inherit"
              onClick={handleGoHome}
              sx={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}
            >
              <HomeIcon fontSize="small" />
              Characters
            </Link>
            <Typography color="text.primary">Error</Typography>
          </Breadcrumbs>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{ mb: 3 }}
          >
            Go Back
          </Button>
        </Box>

        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>

        <Box sx={{ display: 'flex', gap: spacing.lg }}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={retryLoad}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <ErrorBoundary>
      <Container maxWidth="lg" sx={{ py: 4 }}>

        {/* Header with Navigation and Edit Controls */}
        <DetailPageHeader
          loading={loading}
          character={character}
          isEditMode={isEditMode}
          isDirty={isDirty}
          isLocallyModified={isLocallyModified}
          lastModified={lastModified}
          onGoBack={handleGoBack}
          onToggleEditMode={toggleEditMode}
          onSave={handleSave}
          onCancelEdit={cancelEdit}
          onResetToApiData={resetToApiData}
        />

        {/* Character Detail */}
        <CharacterDetail
          character={character}
          loading={loading}
          isEditMode={isEditMode}
          editData={editData}
          isDirty={isDirty}
          isLocallyModified={isLocallyModified}
          lastModified={lastModified}
          onUpdateField={updateEditData}
        />
      </Container>
    </ErrorBoundary>
  );
};

export default DetailPage;