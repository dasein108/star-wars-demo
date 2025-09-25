import { db } from './database';
import { Character, LocalCharacterData } from '../types';

export class CharacterStorage {
  /**
   * Save character modifications to IndexedDB
   */
  async saveCharacter(id: string, modifiedData: Partial<Character>): Promise<void> {
    try {
      const localCharacter: LocalCharacterData = {
        id,
        lastModified: new Date().toISOString(),
        data: modifiedData,
      };

      await db.characters.put(localCharacter);
    } catch (error) {
      console.error('Failed to save character:', error);
      throw error;
    }
  }

  /**
   * Get locally stored character data
   */
  async getCharacter(id: string): Promise<LocalCharacterData | undefined> {
    try {
      return await db.characters.get(id);
    } catch (error) {
      console.error('Failed to get character from storage:', error);
      return undefined;
    }
  }

  /**
   * Delete locally stored character data
   */
  async deleteCharacter(id: string): Promise<void> {
    try {
      await db.characters.delete(id);
    } catch (error) {
      console.error('Failed to delete character from storage:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const characterStorage = new CharacterStorage();