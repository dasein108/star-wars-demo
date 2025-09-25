import React from 'react';
import {
  Person as PersonIcon,
  Transgender as TransgenderIcon,
  Cake as CakeIcon,
  Straighten as HeightIcon,
  Scale as MassIcon,
  RemoveRedEye as EyeIcon,
  Face as FaceIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';
import { CharacterEditFormData } from '../utils/characterValidationSchema';
import {
  formatValue,
  formatHeight,
  formatMass,
} from '../utils/characterHelpers';

export type CharacterFieldKey = keyof CharacterEditFormData;

export interface CharacterFieldConfig {
  key: CharacterFieldKey;
  icon: React.ReactElement;
  label: string;
  inputType?: 'text' | 'select' | 'number';
  suffix?: string;
  formatter?: (value: string) => string;
  options?: Array<{ value: string; label: string }>;
  validation?: boolean;
}

export const CHARACTER_FIELD_CONFIG: Record<CharacterFieldKey, CharacterFieldConfig> = {
  name: {
    key: 'name',
    icon: <PersonIcon color="primary" />,
    label: 'Name',
    inputType: 'text',
    validation: true,
  },
  gender: {
    key: 'gender',
    icon: <TransgenderIcon color="primary" />,
    label: 'Gender',
    inputType: 'select',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'n/a', label: 'N/A' },
      { value: 'unknown', label: 'Unknown' },
    ],
    validation: true,
  },
  birth_year: {
    key: 'birth_year',
    icon: <CakeIcon color="primary" />,
    label: 'Birth Year',
    inputType: 'text',
    formatter: formatValue,
  },
  height: {
    key: 'height',
    icon: <HeightIcon color="primary" />,
    label: 'Height',
    inputType: 'number',
    suffix: 'cm',
    formatter: formatHeight,
    validation: true,
  },
  mass: {
    key: 'mass',
    icon: <MassIcon color="primary" />,
    label: 'Mass',
    inputType: 'number',
    suffix: 'kg',
    formatter: formatMass,
    validation: true,
  },
  eye_color: {
    key: 'eye_color',
    icon: <EyeIcon color="primary" />,
    label: 'Eye Color',
    inputType: 'text',
    formatter: formatValue,
  },
  hair_color: {
    key: 'hair_color',
    icon: <FaceIcon color="primary" />,
    label: 'Hair Color',
    inputType: 'text',
    formatter: formatValue,
  },
  skin_color: {
    key: 'skin_color',
    icon: <PaletteIcon color="primary" />,
    label: 'Skin Color',
    inputType: 'text',
    formatter: formatValue,
  },
};

// Predefined field groups for different use cases
export const BASIC_INFO_FIELDS: CharacterFieldKey[] = [
  'name',
  'gender',
  'birth_year',
  'height',
  'mass',
];

export const APPEARANCE_FIELDS: CharacterFieldKey[] = [
  'eye_color',
  'hair_color',
  'skin_color',
];

export const COMPACT_CARD_FIELDS: CharacterFieldKey[] = [
  'birth_year',
  'height',
  'mass',
  'gender',
];