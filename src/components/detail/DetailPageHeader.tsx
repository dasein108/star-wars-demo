import React from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Restore as RestoreIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { Character } from '../../types/generated/swapi';
import { spacing, componentStyles } from '../../theme/theme';

interface DetailPageHeaderProps {
  loading: boolean;
  character: Character | null;
  isEditMode: boolean;
  isDirty: boolean;
  isLocallyModified: boolean;
  lastModified?: string;
  onGoBack: () => void;
  onToggleEditMode: () => void;
  onSave: () => Promise<void>;
  onCancelEdit: () => void;
  onResetToApiData: () => Promise<void>;
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = ({
  loading,
  character,
  isEditMode,
  isDirty,
  isLocallyModified,
  onGoBack,
  onToggleEditMode,
  onSave,
  onCancelEdit,
  onResetToApiData,
}) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      mb: spacing.xl,
      p: spacing.lg,
      bgcolor: 'background.paper',
      borderRadius: 1,
      boxShadow: 1
    }}>
      {/* Left side - Navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={onGoBack}
        >
          Go Back
        </Button>
        
      </Box>

      {/* Right side - Edit Controls */}
      {!loading && character && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
          {isEditMode ? (
            <>
              <Button
                variant="text"
                startIcon={<SaveIcon />}
                onClick={onSave}
                disabled={!isDirty}
                size="small"
                sx={[componentStyles.primaryButton, { p: spacing.md }]}
              >
                Save
              </Button>
              <Button
                variant="text"
                startIcon={<CancelIcon />}
                onClick={onCancelEdit}
                size="small"
                sx={{  p: spacing.md }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
            <Button
              variant="text"
              size="small"
              startIcon={<RestoreIcon />}
              onClick={onResetToApiData}
              color="secondary"
              sx={{  p: spacing.md }}

              disabled={!isLocallyModified}
            >
              Reset to Original
            </Button>
            <Button
              variant="text"
              startIcon={<EditIcon />}
              onClick={onToggleEditMode}
              sx={{  p: spacing.md }}
            >
              Edit
            </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default DetailPageHeader;