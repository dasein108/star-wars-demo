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
  editData: Partial<Character>;
  isDirty: boolean;
  isLocallyModified: boolean;
  lastModified?: string;
  actions: {
    toggleEditMode: () => void;
    updateEditData: (field: keyof Character, value: string) => void;
    saveChanges: () => Promise<void>;
    cancelEdit: () => void;
    resetToOriginal: () => void;
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
  const [editData, setEditData] = useState<Partial<Character>>({});
  const [originalData, setOriginalData] = useState<Partial<Character>>({});

  // Local storage state
  const [isLocallyModified, setIsLocallyModified] = useState(false);
  const [lastModified, setLastModified] = useState<string>();

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

      // Check if there are local modifications
      const localData = await characterStorage.getCharacter(characterId);

      // Merge API data with local modifications
      const mergedData = localData ? { ...apiData, ...localData.data } : apiData;

      setCharacter(mergedData);

      // Set up editable fields from merged data
      const editableFields = {
        name: mergedData.name,
        height: mergedData.height,
        mass: mergedData.mass,
        hair_color: mergedData.hair_color,
        skin_color: mergedData.skin_color,
        eye_color: mergedData.eye_color,
        birth_year: mergedData.birth_year,
        gender: mergedData.gender,
      };

      setEditData(editableFields);
      setOriginalData(editableFields);

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

  // Check if data has been modified
  const isDirty = Object.keys(editData).some(key => {
    const field = key as keyof Character;
    return editData[field] !== originalData[field];
  });

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    if (isEditMode && isDirty) {
      // If leaving edit mode with changes, ask for confirmation
      const confirmCancel = window.confirm(
        'You have unsaved changes. Are you sure you want to cancel editing?'
      );
      if (!confirmCancel) return;
      
      // Reset to original data
      setEditData(originalData);
    }
    setIsEditMode(prev => !prev);
  }, [isEditMode, isDirty, originalData]);

  // Update edit data
  const updateEditData = useCallback((field: keyof Character, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Save changes
  const saveChanges = useCallback(async () => {
    if (!character || !characterId) return;

    try {
      // Get the changes to save
      const changes = getCharacterDiff(originalData as Character, editData as Character);
      
      if (Object.keys(changes).length === 0) {
        console.log('No changes to save');
        return;
      }

      // Save locally
      await characterStorage.saveCharacter(characterId, changes);

      // Update the character data with saved changes
      const updatedCharacter = { ...character, ...changes };
      setCharacter(updatedCharacter);

      // Update original data to reflect the saved state
      const updatedEditableFields = {
        name: updatedCharacter.name,
        height: updatedCharacter.height,
        mass: updatedCharacter.mass,
        hair_color: updatedCharacter.hair_color,
        skin_color: updatedCharacter.skin_color,
        eye_color: updatedCharacter.eye_color,
        birth_year: updatedCharacter.birth_year,
        gender: updatedCharacter.gender,
      };

      setOriginalData(updatedEditableFields);
      setEditData(updatedEditableFields);
      setIsLocallyModified(true);
      setLastModified(new Date().toISOString());
      setIsEditMode(false);

      console.log('Character changes saved successfully');
    } catch (err) {
      console.error('Failed to save character changes:', err);
      throw err;
    }
  }, [character, characterId, originalData, editData]);

  // Cancel edit
  const cancelEdit = useCallback(() => {
    setEditData(originalData);
    setIsEditMode(false);
  }, [originalData]);

  // Reset to original data
  const resetToOriginal = useCallback(() => {
    setEditData(originalData);
  }, [originalData]);

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
    editData,
    isDirty,
    isLocallyModified,
    lastModified,
    actions: {
      toggleEditMode,
      updateEditData,
      saveChanges,
      cancelEdit,
      resetToOriginal,
      resetToApiData,
      retryLoad,
    },
  };
};