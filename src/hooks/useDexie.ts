import { characterStorage } from '../db/characterStorage';
import { Character } from '../types';

export const useDexie = () => {
  return {
    saveCharacter: async (id: string, data: Partial<Character>) => {
      await characterStorage.saveCharacter(id, data);
    },
    
    getCharacter: async (id: string) => {
      return await characterStorage.getCharacter(id);
    },
  };
};

export const useCharacterStorage = (characterId: string) => {
  const { getCharacter } = useDexie();
  
  return {
    async isModified() {
      const localData = await getCharacter(characterId);
      return localData !== undefined;
    },

    async getModifiedData() {
      const localData = await getCharacter(characterId);
      return localData?.data;
    },

    async getLastModified() {
      const localData = await getCharacter(characterId);
      return localData?.lastModified;
    }
  };
};