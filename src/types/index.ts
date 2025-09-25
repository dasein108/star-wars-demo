/**
 * Central export file for all TypeScript types used in the application
 * Contains only types actually used in the codebase
 */

// Re-export types from SWAPI (Character, ApiResponse, ApiError)
export * from './generated/swapi';

// Local application types
export interface LocalCharacterData {
  /** Character ID from SWAPI URL */
  id: string;
  /** ISO timestamp of last modification */
  lastModified: string;
  /** Only the modified fields from the character */
  data: Partial<Character>;
}


// Re-import Character to make it available in this module
import type { Character } from './generated/swapi';