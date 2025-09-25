import React, { useState, useEffect } from 'react';
import { Box, Typography, Tooltip, TextField, Select, MenuItem, FormControl, InputAdornment } from '@mui/material';
import { Character } from '../../types/generated/swapi';
import { spacing } from '../../theme/theme';
import { layouts } from '../../theme/layouts';
import { CHARACTER_FIELD_CONFIG, CharacterFieldKey } from '../../config/characterFields';

interface CharacterCharacteristicProps {
  fieldKey: CharacterFieldKey;
  character: Character;
  formValue?: string;
  isEditMode?: boolean;
  onUpdate?: (field: keyof Character, value: string) => void;
  formError?: string;
  variant?: 'default' | 'compact';
}

const CharacterCharacteristic: React.FC<CharacterCharacteristicProps> = ({
  fieldKey,
  character,
  formValue,
  isEditMode = false,
  onUpdate,
  formError,
  variant = 'default',
}) => {
  // Get field configuration
  const config = CHARACTER_FIELD_CONFIG[fieldKey];
  
  const { icon, label, inputType = 'text', options = [], suffix = '', formatter } = config;
  const isEditable = !!onUpdate;
  
  // Get value with auto-formatting
  const getValue = (): string => {
    const characterValue = character[fieldKey] || '';
    
    if (isEditMode) {
      return formValue || characterValue;
    }
    
    return formatter ? formatter(characterValue) : characterValue;
  };
  
  const value = getValue();
  
  const [editValue, setEditValue] = useState(value);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEditValue(value);
    setError(formError || null);
  }, [value, isEditMode, formError]);

  const handleChange = (newValue: string) => {
    setEditValue(newValue);
    // Validation is handled externally by react-hook-form
    setError(null);
  };

  const handleBlur = () => {
    if (onUpdate && editValue !== value) {
      onUpdate(fieldKey, editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onUpdate) {
        onUpdate(fieldKey, editValue);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setEditValue(value);
      setError(null);
    }
  };

  const renderEditComponent = () => {
    if (inputType === 'select') {
      return (
        <FormControl size="small" error={!!error}>
          <Select
            value={editValue}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            sx={{ minWidth: 120 }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return (
      <TextField
        size="small"
        value={editValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        error={!!error}
        helperText={error}
        type={inputType === 'number' ? 'text' : 'text'}
        slotProps={suffix ? {
          input: {
            endAdornment: <InputAdornment position="end">{suffix}</InputAdornment>
          }
        } : undefined}
        sx={{ minWidth: 120 }}
      />
    );
  };
  if (variant === 'compact') {
    return (
      <Tooltip title={label} arrow placement="left">
        <Box sx={[layouts.flexRowGap(spacing.component.iconGap), { minHeight: 16 }]}>
          {React.cloneElement(icon as React.ReactElement, {
            sx: { 
              fontSize: { xs: 12, sm: 14 }, 
              color: 'text.secondary', 
              flexShrink: 0,
              ...(icon as React.ReactElement).props?.sx
            }
          })}
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {value}
          </Typography>
        </Box>
      </Tooltip>
    );
  }

  return (
    <Box sx={[layouts.flexRowGap(spacing.lg), { mb: spacing.lg }]}>
      {icon}
      <Box sx={[layouts.flexRowGap(spacing.sm), { flex: 1 }]}>
        <Typography variant="body1" color="text.primary" sx={{ minWidth: 100, flexShrink: 0 }}>
          <strong>{label}:</strong>
        </Typography>
        {isEditable && isEditMode ? (
          renderEditComponent()
        ) : (
          <Typography variant="body1" color="text.primary">
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CharacterCharacteristic;
