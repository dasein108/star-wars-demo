/**
 * Character utility functions for formatting and displaying character data
 */

/**
 * Format height value with units
 */
export const formatHeight = (height: string): string => {
  if (height === 'unknown' || height === 'n/a') return 'Unknown';
  return `${height} cm`;
};

/**
 * Format mass value with units
 */
export const formatMass = (mass: string): string => {
  if (mass === 'unknown' || mass === 'n/a') return 'Unknown';
  return `${mass} kg`;
};


/**
 * Format any character field value, handling unknown/n/a cases
 */
export const formatValue = (value: string): string => {
  return value === 'unknown' || value === 'n/a' ? 'Unknown' : value;
};

/**
 * Generate avatar URL for a character
 */
export const getCharacterAvatarUrl = (characterName: string): string => {
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(characterName)}`;
};

/**
 * Format last modified timestamp to human-readable format
 */
export const formatLastModified = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInMinutes < 1440) { // 24 hours
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  } catch {
    return 'Unknown';
  }
};

/**
 * Get character display name (handles empty/null names)
 */
export const getCharacterDisplayName = (name: string | null | undefined): string => {
  if (!name || name.trim() === '') {
    return 'Unknown Character';
  }
  return name.trim();
};

/**
 * Check if a character field has a valid value (not unknown/n/a)
 */
export const hasValidValue = (value: string): boolean => {
  return value !== 'unknown' && value !== 'n/a' && value.trim() !== '';
};

/**
 * Get character initials for fallback display
 */
export const getCharacterInitials = (name: string): string => {
  if (!name || name.trim() === '') return '?';
  
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  return words
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

export default {
  formatHeight,
  formatMass,
  formatValue,
  getCharacterAvatarUrl,
  formatLastModified,
  getCharacterDisplayName,
  hasValidValue,
  getCharacterInitials,
};