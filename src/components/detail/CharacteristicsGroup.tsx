import React from 'react';
import { Box, Typography } from '@mui/material';
import { Character } from '../../types/generated/swapi';
import CharacterCharacteristic from '../common/CharacterCharacteristic';
import { spacing } from '../../theme/theme';
import { CharacterFieldKey } from '../../config/characterFields';
import { FieldErrors } from 'react-hook-form';
import { CharacterEditFormData } from '../../utils/characterValidationSchema';

interface CharacteristicsGroupProps {
  title: string;
  fields: CharacterFieldKey[];
  character: Character;
  isEditMode?: boolean;
  formValues?: Partial<CharacterEditFormData>;
  formErrors?: FieldErrors<CharacterEditFormData>;
  onUpdate?: (field: keyof Character, value: string) => void;
}

const CharacteristicsGroup: React.FC<CharacteristicsGroupProps> = ({
  title,
  fields,
  character,
  isEditMode = false,
  formValues = {},
  formErrors = {},
  onUpdate,
}) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: spacing.lg }}>
        {title}
      </Typography>
      
      {fields.map((fieldKey) => (
        <CharacterCharacteristic
          key={fieldKey}
          fieldKey={fieldKey}
          character={character}
          isEditMode={isEditMode}
          formValue={formValues[fieldKey]}
          formError={formErrors[fieldKey]?.message}
          onUpdate={onUpdate}
        />
      ))}
    </Box>
  );
};

export default CharacteristicsGroup;