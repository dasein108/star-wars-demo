import React from 'react';
import { Box, Typography } from '@mui/material';
import { Character } from '../../types/generated/swapi';
import CharacterCharacteristic from '../common/CharacterCharacteristic';
import { spacing } from '../../theme/theme';

interface CharacteristicsGroupProps {
  title: string;
  characteristics: Array<{
    icon: React.ReactNode;
    label: string;
    value: string;
    field?: keyof Character;
    inputType?: 'text' | 'select' | 'number';
    suffix?: string;
    options?: Array<{value: string, label: string}>;
    validation?: (value: string) => string | null;
  }>;
  isEditMode?: boolean;
  onUpdate?: (field: keyof Character, value: string) => void;
}

const CharacteristicsGroup: React.FC<CharacteristicsGroupProps> = ({
  title,
  characteristics,
  isEditMode = false,
  onUpdate,
}) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: spacing.lg }}>
        {title}
      </Typography>
      
      {characteristics.map((characteristic, index) => (
        <CharacterCharacteristic
          key={`${characteristic.field || index}`}
          icon={characteristic.icon}
          label={characteristic.label}
          value={characteristic.value}
          field={characteristic.field}
          isEditable={!!characteristic.field}
          isEditMode={isEditMode}
          inputType={characteristic.inputType}
          suffix={characteristic.suffix}
          options={characteristic.options}
          onUpdate={onUpdate}
          validation={characteristic.validation}
        />
      ))}
    </Box>
  );
};

export default CharacteristicsGroup;