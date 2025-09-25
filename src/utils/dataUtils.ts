import { Character } from '../types/generated/swapi';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

/**
 * Compare two character objects and return only the differences
 */
export function getCharacterDiff(original: Character, modified: Character): Partial<Character> {
  const diff: Partial<Character> = {};
  
  // Define fields that can be modified
  const editableFields: (keyof Character)[] = [
    'name', 'height', 'mass', 'hair_color', 'skin_color', 
    'eye_color', 'birth_year', 'gender'
  ];
  
  editableFields.forEach(field => {
    if (original[field] !== modified[field]) {
      diff[field] = modified[field];
    }
  });
  
  return diff;
}

/**
 * Validate character data for storage
 */
export function validateCharacterData(data: Partial<Character>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Name validation
  if (data.name !== undefined) {
    if (!data.name.trim()) {
      errors.push('Name cannot be empty');
    } else if (data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    } else if (data.name.length > 100) {
      warnings.push('Name is unusually long');
    }
  }
  
  // Height validation
  if (data.height !== undefined && data.height !== 'unknown') {
    const height = parseInt(data.height, 10);
    if (isNaN(height)) {
      errors.push('Height must be a number or "unknown"');
    } 
  }
  
  // Mass validation
  if (data.mass !== undefined && data.mass !== 'unknown') {
    const mass = parseInt(data.mass, 10);
    if (isNaN(mass)) {
      errors.push('Mass must be a number or "unknown"');
    } 
  }
  
  // Gender validation
  if (data.gender !== undefined) {
    const validGenders = ['male', 'female', 'n/a', 'unknown'];
    if (!validGenders.includes(data.gender.toLowerCase())) {
      errors.push('Gender must be one of: male, female, n/a, unknown');
    }
  }
  
  // Color validations (hair, skin, eye)
  const colorFields: { field: keyof Character; name: string }[] = [
    { field: 'hair_color', name: 'Hair color' },
    { field: 'skin_color', name: 'Skin color' },
    { field: 'eye_color', name: 'Eye color' },
  ];
  
  colorFields.forEach(({ field, name }) => {
    if (data[field] !== undefined) {
      const value = data[field] as string;
      if (value.length > 50) {
        warnings.push(`${name} value is unusually long`);
      }
      // Allow any color value including "none", "n/a", "unknown", etc.
    }
  });
  
  // Birth year validation
  if (data.birth_year !== undefined && data.birth_year !== 'unknown') {
    // Allow formats like "19BBY", "41.9BBY", "112BBY", etc.
    const birthYearPattern = /^\d+(\.\d+)?(BBY|ABY)$/i;
    if (!birthYearPattern.test(data.birth_year)) {
      errors.push('Birth year must follow format like "19BBY" or "41.9ABY" or be "unknown"');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Extract character ID from SWAPI URL
 */
export function extractCharacterId(url: string): string {
  try {
    // Extract ID from URL like https://swapi.py4e.com/api/people/1/
    const matches = url.match(/\/people\/(\d+)\//);
    if (matches && matches[1]) {
      return matches[1];
    }
    
    // Fallback: try to extract any number from the URL
    const numberMatch = url.match(/(\d+)/);
    if (numberMatch && numberMatch[1]) {
      return numberMatch[1];
    }
    
    throw new Error('No ID found in URL');
  } catch (error) {
    console.error('Failed to extract character ID from URL:', url, error);
    return url; // Return original URL as ID if extraction fails
  }
}

/**
 * Format last modified timestamp for display
 */
export function formatLastModified(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  } catch (error) {
    console.error('Failed to format timestamp:', timestamp, error);
    return 'Unknown';
  }
}

/**
 * Deep merge two objects, with source overriding target
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];
      
      if (sourceValue !== undefined) {
        if (
          typeof sourceValue === 'object' && 
          sourceValue !== null && 
          !Array.isArray(sourceValue) &&
          typeof targetValue === 'object' && 
          targetValue !== null && 
          !Array.isArray(targetValue)
        ) {
          // Deep merge objects
          result[key] = deepMerge(targetValue, sourceValue);
        } else {
          // Direct assignment for primitives, arrays, or null values
          (result as any)[key] = sourceValue;
        }
      }
    }
  }
  
  return result;
}

/**
 * Check if a character field has been modified
 */
export function isFieldModified(original: Character, current: Character, field: keyof Character): boolean {
  return original[field] !== current[field];
}

/**
 * Get list of modified fields
 */
export function getModifiedFields(original: Character, current: Character): (keyof Character)[] {
  const editableFields: (keyof Character)[] = [
    'name', 'height', 'mass', 'hair_color', 'skin_color', 
    'eye_color', 'birth_year', 'gender'
  ];
  
  return editableFields.filter(field => isFieldModified(original, current, field));
}

/**
 * Sanitize string for safe storage (prevent XSS)
 */
export function sanitizeString(str: string): string {
  if (typeof str !== 'string') {
    return String(str);
  }
  
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize character data before storage
 */
export function sanitizeCharacterData(data: Partial<Character>): Partial<Character> {
  const sanitized: Partial<Character> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key as keyof Character] = sanitizeString(value) as any;
    } else {
      sanitized[key as keyof Character] = value;
    }
  }
  
  return sanitized;
}