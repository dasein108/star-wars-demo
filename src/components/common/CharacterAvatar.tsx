import React from 'react';
import {
  Avatar,
} from '@mui/material';
import { getCharacterAvatarUrl, getCharacterInitials } from '../../utils/characterHelpers';

interface CharacterAvatarProps {
  name: string;
  variant?: 'card' | 'detail';
}

const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  name,
  variant = 'card',
}) => {
  const avatarUrl = getCharacterAvatarUrl(name);
  const initials = getCharacterInitials(name);

  // Size configurations
  const getSizeConfig = () => {


    // Default sizes based on variant
    switch (variant) {
   
      case 'detail':
        return { 
          width: { xs: 180, sm: 320 }, 
          height: { xs: 180, sm: 320 } 
        };
      default:
        return { 
          width: { xs: 140, sm: 160 }, 
          height: { xs: 140, sm: 160 } 
        };
    }
  };

  const sizeConfig = getSizeConfig();

  // Detail variant - uses Material-UI Avatar component
  return (
    <Avatar
      src={avatarUrl}
      alt={`${name} avatar`}
      sx={{
        ...sizeConfig,
        p: { xs: 1, sm: 2 },
      }}
    >
      {initials}
    </Avatar>
  );
};

export default CharacterAvatar;