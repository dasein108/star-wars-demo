import { useState, useEffect, useCallback } from 'react';
import { Character } from '../types/generated/swapi';
import { swapiService } from '../services/api';
import { characterStorage } from '../db/characterStorage';
import { getCharacterDiff } from '../utils/dataUtils';

interface UseCharacterDetailReturn {
  character: Character | null;
  loading: boolean;
  error: string | null;
  isEditMode: boolean;
  isLocallyModified: boolean;
  lastModified?: string;
  actions: {
    toggleEditMode: () => void;
    saveCharacter: (data: Partial<Character>) => Promise<void>;
    resetToApiData: () => Promise<void>;
    retryLoad: () => void;
  };
}

export const useCharacterDetail = (characterId: string | undefined): UseCharacterDetailReturn => {
  // Character state
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Local storage state
  const [isLocallyModified, setIsLocallyModified] = useState(false);
  const [lastModified, setLastModified] = useState<string>();
  const [originalApiData, setOriginalApiData] = useState<Character | null>(null);

  // Load character data
  const loadCharacter = useCallback(async () => {
    if (!characterId) {
      setError('No character ID provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // First, get the API data
      const apiData = await swapiService.getCharacter(parseInt(characterId, 10));
      setOriginalApiData(apiData);

      // Check if there are local modifications
      const localData = await characterStorage.getCharacter(characterId);

      // Merge API data with local modifications
      const mergedData = localData ? { ...apiData, ...localData.data } : apiData;
      setCharacter(mergedData);

      // Update local modification status
      setIsLocallyModified(!!localData);
      setLastModified(localData?.lastModified);

    } catch (err) {
      console.error('Failed to load character:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load character. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [characterId]);

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  // Save character changes
  const saveCharacter = useCallback(async (formData: Partial<Character>) => {
    if (!character || !characterId || !originalApiData) return;

    try {
      // Get the changes to save (compare with original API data)
      const changes = getCharacterDiff(originalApiData, formData as Character);
      
      if (Object.keys(changes).length === 0) {
        console.log('No changes to save');
        setIsEditMode(false);
        return;
      }

      // Save locally
      await characterStorage.saveCharacter(characterId, changes);

      // Update the character data with saved changes
      const updatedCharacter = { ...character, ...changes };
      setCharacter(updatedCharacter);

      setIsLocallyModified(true);
      setLastModified(new Date().toISOString());
      setIsEditMode(false);

      console.log('Character changes saved successfully');
    } catch (err) {
      console.error('Failed to save character changes:', err);
      throw err;
    }
  }, [character, characterId, originalApiData]);

  // Reset to API data
  const resetToApiData = useCallback(async () => {
    if (!characterId) return;

    try {
      // Delete local modifications
      await characterStorage.deleteCharacter(characterId);

      // Reload from API
      await loadCharacter();

      console.log('Character reset to original API data');
    } catch (err) {
      console.error('Failed to reset character to API data:', err);
      throw err;
    }
  }, [characterId, loadCharacter]);

  // Retry load
  const retryLoad = useCallback(() => {
    loadCharacter();
  }, [loadCharacter]);

  // Load character when component mounts or characterId changes
  useEffect(() => {
    loadCharacter();
  }, [loadCharacter]);

  return {
    character,
    loading,
    error,
    isEditMode,
    isLocallyModified,
    lastModified,
    actions: {
      toggleEditMode,
      saveCharacter,
      resetToApiData,
      retryLoad,
    },
  };
};