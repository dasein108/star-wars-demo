import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Skeleton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Transgender as TransgenderIcon,
  Cake as CakeIcon,
  Straighten as HeightIcon,
  Scale as MassIcon,
  RemoveRedEye as EyeIcon,
  Face as FaceIcon,
  Palette as PaletteIcon,
  CloudDone as CloudDoneIcon,
} from '@mui/icons-material';
import { Character } from '../../types/generated/swapi';
import CharacterAvatar from '../common/CharacterAvatar';
import CharacteristicsGroup from './CharacteristicsGroup';
import {
  formatValue,
  formatHeight,
  formatMass,
} from '../../utils/characterHelpers';
import { spacing } from '../../theme/theme';
import { layouts } from '../../theme/layouts';
import { componentStyles } from '../../theme/componentStyles';
import { CharacterDetailSkeleton } from '../common/Loading';

interface CharacterDetailProps {
  character: Character | null;
  loading: boolean;
  isEditMode: boolean;
  editData: Partial<Character>;
  isDirty: boolean;
  isLocallyModified: boolean;
  lastModified?: string;
  onUpdateField: (field: keyof Character, value: string) => void;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({
  character,
  loading,
  isEditMode,
  editData,
  isDirty,
  isLocallyModified,
  onUpdateField,
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
              isEditMode={isEditMode}
              onUpdate={onUpdateField}
              characteristics={[
                {
                  icon: <PersonIcon color="primary" />,
                  label: "Name",
                  value: isEditMode ? (editData.name || character.name) : character.name,
                  field: "name",
                  inputType: "text",
                  validation: (value: string) => {
                    if (!value.trim()) return 'Name is required';
                    return null;
                  }
                },
                {
                  icon: <TransgenderIcon color="primary" />,
                  label: "Gender",
                  value: isEditMode ? (editData.gender || character.gender) : character.gender,
                  field: "gender",
                  inputType: "select",
                  options: [
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'n/a', label: 'N/A' },
                    { value: 'unknown', label: 'Unknown' },
                  ]
                },
                {
                  icon: <CakeIcon color="primary" />,
                  label: "Birth Year",
                  value: isEditMode ? (editData.birth_year || character.birth_year) : formatValue(character.birth_year),
                  field: "birth_year",
                  inputType: "text"
                },
                {
                  icon: <HeightIcon color="primary" />,
                  label: "Height",
                  value: isEditMode ? (editData.height || character.height) : formatHeight(character.height),
                  field: "height",
                  inputType: "number",
                  suffix: "cm",
                  validation: (value: string) => {
                    if (value !== 'unknown' && value.trim()) {
                      const height = parseInt(value, 10);
                      if (isNaN(height)) return 'Height must be a number';
                    }
                    return null;
                  }
                },
                {
                  icon: <MassIcon color="primary" />,
                  label: "Mass",
                  value: isEditMode ? (editData.mass || character.mass) : formatMass(character.mass),
                  field: "mass",
                  inputType: "number",
                  suffix: "kg",
                  validation: (value: string) => {
                    if (value !== 'unknown' && value.trim()) {
                      const mass = parseInt(value, 10);
                      if (isNaN(mass)) return 'Mass must be a number';
                    }
                    return null;
                  }
                }
              ]}
            />

            {/* Right Column - Appearance Information */}
            <CharacteristicsGroup
              title="Appearance"
              isEditMode={isEditMode}
              onUpdate={onUpdateField}
              characteristics={[
                {
                  icon: <EyeIcon color="primary" />,
                  label: "Eye Color",
                  value: isEditMode ? (editData.eye_color || character.eye_color) : formatValue(character.eye_color),
                  field: "eye_color",
                  inputType: "text"
                },
                {
                  icon: <FaceIcon color="primary" />,
                  label: "Hair Color",
                  value: isEditMode ? (editData.hair_color || character.hair_color) : formatValue(character.hair_color),
                  field: "hair_color",
                  inputType: "text"
                },
                {
                  icon: <PaletteIcon color="primary" />,
                  label: "Skin Color",
                  value: isEditMode ? (editData.skin_color || character.skin_color) : formatValue(character.skin_color),
                  field: "skin_color",
                  inputType: "text"
                }
              ]}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CharacterDetail;