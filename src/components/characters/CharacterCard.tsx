import React from 'react';
import {
  CardContent,
  Typography,
  Box,
  CardActionArea,
} from '@mui/material';
import {
  Cake as CakeIcon,
  Straighten as HeightIcon,
  Scale as MassIcon,
  Person as GenderIcon,
} from '@mui/icons-material';
import { Character } from '../../types/generated/swapi';
import { FadeInCard } from '../common/Animations';
import {
  formatHeight,
  formatMass,
} from '../../utils/characterHelpers';
import CharacterAvatar from '../common/CharacterAvatar';
import CharacterCharacteristic from '../common/CharacterCharacteristic';
import { spacing } from '../../theme/theme';
import { layouts } from '../../theme/layouts';
import { componentStyles } from '../../theme/componentStyles';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = React.memo(({ character, onClick }) => {
  const handleClick = () => {
    onClick(character);
  };

  return (
    <FadeInCard
      sx={[
        layouts.fullHeightFlex,
        {
          minHeight: { xs: 200, sm: 220 },
          maxWidth: { xs: '100%', sm: 280 },
          mx: { xs: spacing.none, sm: 'auto' },
        }
      ]}
    >
      <CardActionArea 
        onClick={handleClick} 
        sx={[
          layouts.fullHeightFlex,
          componentStyles.touchTarget,
          { p: spacing.none }
        ]}
      >
        <CardContent 
          sx={[
            layouts.fullHeightFlex,
            { 
              flexGrow: 1, 
              p: spacing.component.cardPadding,
              '&:last-child': { pb: spacing.component.cardPadding },
            }
          ]}
        >
          {/* Avatar and Characteristics Side by Side */}
          <Box 
            sx={[
              layouts.flexStart,
              {
                gap: spacing.component.cardGap,
                mb: spacing.component.cardMargin,
              }
            ]}
          >
            {/* Avatar on the left */}
            <Box sx={{ flexShrink: 0 }}>
              <CharacterAvatar 
                name={character.name}
                variant="card"
              />
            </Box>

            {/* Characteristics on the right */}
            <Box 
              sx={[
                layouts.flexColumnGap(spacing.component.iconGap),
                {
                  flex: 1,
                  justifyContent: 'flex-start',
                }
              ]}
            >
              <CharacterCharacteristic
                icon={<CakeIcon />}
                label="Birth Year"
                value={character.birth_year}
                variant="compact"
                isEditable={false}
              />
              
              <CharacterCharacteristic
                icon={<HeightIcon />}
                label="Height"
                value={formatHeight(character.height)}
                variant="compact"
                isEditable={false}
              />
              
              <CharacterCharacteristic
                icon={<MassIcon />}
                label="Mass"
                value={formatMass(character.mass)}
                variant="compact"
                isEditable={false}
              />
              
              <CharacterCharacteristic
                icon={<GenderIcon />}
                label="Gender"
                value={character.gender}
                variant="compact"
                isEditable={false}
              />
            </Box>
          </Box>

          {/* Character Name at bottom */}
          <Typography
            variant="subtitle1"
            component="h2"
            sx={[
              componentStyles.multiLineEllipsis(2),
              layouts.centerText,
              {
                fontWeight: 600,
                lineHeight: 1.2,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                mt: 'auto',
              }
            ]}
          >
            {character.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </FadeInCard>
  );
});

CharacterCard.displayName = 'CharacterCard';

export default CharacterCard;