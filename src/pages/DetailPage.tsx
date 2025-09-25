import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { characterEditSchema, CharacterEditFormData } from '../utils/characterValidationSchema';
import { useToast } from '../hooks/useToast';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning, showInfo } = useToast();
  
  const {
    character,
    loading,
    error,
    isEditMode,
    isLocallyModified,
    lastModified,
    actions: {
      toggleEditMode,
      saveCharacter,
      resetToApiData,
      retryLoad,
    },
  } = useCharacterDetail(id);

  const form = useForm<CharacterEditFormData>({
    resolver: zodResolver(characterEditSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      height: '',
      mass: '',
      gender: '',
      birth_year: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
    },
  });

  useEffect(() => {
    if (character && isEditMode) {
      form.reset({
        name: character.name || '',
        height: character.height || '',
        mass: character.mass || '',
        gender: character.gender || '',
        birth_year: character.birth_year || '',
        hair_color: character.hair_color || '',
        skin_color: character.skin_color || '',
        eye_color: character.eye_color || '',
      });
    }
  }, [character, isEditMode, form]);

  const handleGoBack = () => {
    if (form.formState.isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave this page?'
      );
      if (!confirmLeave) {
        showWarning('Please save or cancel your changes before leaving.');
        return;
      }
    }
    navigate(-1);
  };

  const handleGoHome = () => {
    if (form.formState.isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave this page?'
      );
      if (!confirmLeave) {
        showWarning('Please save or cancel your changes before leaving.');
        return;
      }
    }
    navigate('/');
  };

  // Handle save with validation
  const handleSave = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      const errors = form.formState.errors;
      const errorMessages = Object.entries(errors)
        .map(([field, error]) => `${field}: ${error?.message}`)
        .join(', ');
      showError(`Please fix validation errors: ${errorMessages}`);
      return;
    }
    
    try {
      const formData = form.getValues();
      await saveCharacter(formData);
      form.reset(formData); // Reset form to mark as not dirty
      showSuccess('Character changes saved successfully!');
    } catch (err) {
      console.error('Failed to save:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to save changes. Please try again.';
      showError(errorMessage);
    }
  };

  // Handle reset to API data with toast
  const handleResetToApiData = async () => {
    try {
      await resetToApiData();
      showSuccess('Character data reset to original API values.');
    } catch (err) {
      console.error('Failed to reset:', err);
      showError('Failed to reset character data. Please try again.');
    }
  };

  // Handle cancel edit with toast
  const handleCancelEdit = () => {
    const hadChanges = form.formState.isDirty;
    toggleEditMode();
    if (character) {
      form.reset({
        name: character.name || '',
        height: character.height || '',
        mass: character.mass || '',
        gender: character.gender || '',
        birth_year: character.birth_year || '',
        hair_color: character.hair_color || '',
        skin_color: character.skin_color || '',
        eye_color: character.eye_color || '',
      });
    }
    if (hadChanges) {
      showInfo('Changes cancelled. All unsaved modifications have been reverted.');
    }
  };

  // Handle field updates with form validation
  const handleUpdateField = (field: keyof Character, value: string) => {
    form.setValue(field as keyof CharacterEditFormData, value, { 
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true
    });
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
          isDirty={form.formState.isDirty}
          isLocallyModified={isLocallyModified}
          lastModified={lastModified}
          onGoBack={handleGoBack}
          onToggleEditMode={toggleEditMode}
          onSave={handleSave}
          onCancelEdit={handleCancelEdit}
          onResetToApiData={handleResetToApiData}
        />

        {/* Character Detail */}
        <CharacterDetail
          character={character}
          loading={loading}
          isEditMode={isEditMode}
          isDirty={form.formState.isDirty}
          isLocallyModified={isLocallyModified}
          onUpdateField={handleUpdateField}
          formErrors={form.formState.errors}
          formValues={form.watch()}
        />
      </Container>
    </ErrorBoundary>
  );
};

export default DetailPage;