import React from 'react';
import {
  Box,
  Pagination as MuiPagination,
  Typography,
  useMediaQuery,
} from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage && !loading) {
      onPageChange(page);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        py: 4,
        mt: 4,
      }}
    >
      
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size={isMobile ? 'medium' : 'large'}
        disabled={loading}
        showFirstButton={!isMobile}
        showLastButton={!isMobile}
        siblingCount={isMobile ? 0 : 1}
        boundaryCount={isMobile ? 1 : 2}
        sx={{
          '& .MuiPagination-ul': {
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
          '& .MuiPaginationItem-root': {
            minWidth: isMobile ? 32 : 40,
            height: isMobile ? 32 : 40,
            margin: isMobile ? '2px' : '4px',
          },
        }}
      />
      
      {isMobile && (
        <Typography variant="caption" color="text.secondary">
          Page {currentPage} of {totalPages}
        </Typography>
      )}
    </Box>
  );
};

export default Pagination;