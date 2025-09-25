import React from 'react';
import { Box } from '@mui/material';
import { Character } from '../../types/generated/swapi';
import { COMPACT_CARD_FIELDS } from '../../config/characterFields';
import { spacing } from '../../theme/theme';
import { layouts } from '../../theme/layouts';
import CharacterCharacteristic from './CharacterCharacteristic';

interface CompactCharacteristicsProps {
  character: Character;
}

const CompactCharacteristics: React.FC<CompactCharacteristicsProps> = ({
  character,
}) => {
  return (
    <Box 
      sx={[
        layouts.flexColumnGap(spacing.component.iconGap),
        {
          flex: 1,
          justifyContent: 'flex-start',
        }
      ]}
    >
      {COMPACT_CARD_FIELDS.map((fieldKey) => (
        <CharacterCharacteristic
          key={fieldKey}
          fieldKey={fieldKey}
          character={character}
          variant="compact"
        />
      ))}
    </Box>
  );
};

export default CompactCharacteristics;