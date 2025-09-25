import React, { useState, useTransition, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Box,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

interface CharacterSearchProps {
  value: string;
  onSearchChange: (query: string) => void;
  loading?: boolean;
  placeholder?: string;
}

const CharacterSearch: React.FC<CharacterSearchProps> = ({
  value,
  onSearchChange,
  loading = false,
  placeholder = "Search characters...",
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isPending, startTransition] = useTransition();

  // Handle input change with transition
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    
    startTransition(() => {
      onSearchChange(newValue);
    });
  };

  // Handle clear search
  const handleClearSearch = () => {
    setInputValue('');
    startTransition(() => {
      onSearchChange('');
    });
  };

  // Sync external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {loading || isPending ? (
                <CircularProgress size={20} />
              ) : (
                <SearchIcon color="action" />
              )}
            </InputAdornment>
          ),
          endAdornment: inputValue && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClearSearch}
                edge="end"
                size="small"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default CharacterSearch;