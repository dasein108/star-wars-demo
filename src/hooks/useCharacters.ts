import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Character, ApiResponse } from '../types/generated/swapi';
import { swapiService } from '../services/api';

interface UseCharactersReturn {
  characters: Character[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  goToPage: (page: number) => void;
  retryLoad: () => void;
}

export const useCharacters = (): UseCharactersReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  
  // Get URL parameters
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('search') || '';

  // Load characters function
  const loadCharacters = useCallback(async (page: number, query: string) => {
    try {
      setLoading(true);
      setError(null);

      let response: ApiResponse<Character>;
      
      if (query.trim()) {
        // Search characters
        response = await swapiService.searchCharacters(query);
      } else {
        // Get paginated characters
        response = await swapiService.getCharacters(page);
      }

      setCharacters(response.results);
      
      // Calculate total pages (SWAPI returns count and has ~10 items per page)
      const itemsPerPage = 10;
      const calculatedTotalPages = Math.ceil(response.count / itemsPerPage);
      setTotalPages(calculatedTotalPages);
      
    } catch (err) {
      console.error('Failed to load characters:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to load characters. Please try again.'
      );
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update search query
  const setSearchQuery = useCallback((query: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (query.trim()) {
      newParams.set('search', query);
      newParams.delete('page'); // Reset to first page when searching
    } else {
      newParams.delete('search');
      if (!newParams.get('page')) {
        newParams.set('page', '1');
      }
    }
    
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  // Navigate to page
  const goToPage = useCallback((page: number) => {
    if (page < 1 || page > totalPages) return;
    
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  }, [searchParams, setSearchParams, totalPages]);

  // Retry load function
  const retryLoad = useCallback(() => {
    loadCharacters(currentPage, searchQuery);
  }, [loadCharacters, currentPage, searchQuery]);

  // Effect to load data when page or search changes
  useEffect(() => {
    loadCharacters(currentPage, searchQuery);
  }, [loadCharacters, currentPage, searchQuery]);

  // Validate current page (redirect to page 1 if invalid)
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0 && !searchQuery) {
      goToPage(1);
    }
  }, [currentPage, totalPages, searchQuery, goToPage]);

  return {
    characters,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    goToPage,
    retryLoad,
  };
};