import React from 'react';
import { FieldErrors } from 'react-hook-form';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  CloudDone as CloudDoneIcon,
} from '@mui/icons-material';
import { Character } from '../../types/generated/swapi';
import CharacterAvatar from '../common/CharacterAvatar';
import CharacteristicsGroup from './CharacteristicsGroup';
import { CharacterEditFormData } from '../../utils/characterValidationSchema';
import { BASIC_INFO_FIELDS, APPEARANCE_FIELDS } from '../../config/characterFields';
import { spacing } from '../../theme/theme';
import { layouts } from '../../theme/layouts';
import { componentStyles } from '../../theme/componentStyles';
import { CharacterDetailSkeleton } from '../common/Loading';

interface CharacterDetailProps {
  character: Character | null;
  loading: boolean;
  isEditMode: boolean;
  isDirty: boolean;
  isLocallyModified: boolean;
  onUpdateField: (field: keyof Character, value: string) => void;
  formErrors?: FieldErrors<CharacterEditFormData>;
  formValues?: Partial<CharacterEditFormData>;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({
  character,
  loading,
  isEditMode,
  isDirty,
  isLocallyModified,
  onUpdateField,
  formErrors = {},
  formValues = {},
}) => {
  if (loading) {
    return <CharacterDetailSkeleton />;
  }

  if (!character) {
    return null;
  }


  return (
    <Box>
      {/* Main Character Information */}
      <Card sx={componentStyles.staticCard}>
        <CardContent sx={{ p: spacing.xxl }}>
          {/* Character Name Header */}
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold'}}>
            {character.name}
          </Typography>

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
              <CharacterAvatar
                name={character.name}
                variant="detail"
              />
          {/* Status Chips */}
          <Box sx={[componentStyles.statusChip, { gap: spacing.sm, mb: spacing.xxl }]}>
            {isDirty && (
              <Chip 
                label="Unsaved Changes" 
                color="warning" 
                size="medium"
                icon={<EditIcon fontSize="small" />}
              />
            )}
            
            {isLocallyModified && (
              <Chip 
                label="Locally Modified" 
                color="info" 
                size="medium"
                icon={<CloudDoneIcon fontSize="small" />}
              />
            )}
          </Box>
            </Box>

            {/* Middle Column - Basic Information */}
            <CharacteristicsGroup
              title="Basic Information"
              fields={BASIC_INFO_FIELDS}
              character={character}
              isEditMode={isEditMode}
              formValues={formValues}
              formErrors={formErrors}
              onUpdate={onUpdateField}
            />

            {/* Right Column - Appearance Information */}
            <CharacteristicsGroup
              title="Appearance"
              fields={APPEARANCE_FIELDS}
              character={character}
              isEditMode={isEditMode}
              formValues={formValues}
              formErrors={formErrors}
              onUpdate={onUpdateField}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CharacterDetail;