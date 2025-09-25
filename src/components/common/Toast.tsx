import React, { useState, createContext, useContext, useCallback } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface ToastMessage {
  message: string;
  severity: AlertColor;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, severity?: AlertColor, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback((message: string, severity: AlertColor = 'info', duration = 6000) => {
    setToast({ message, severity, duration });
  }, []);

  const showSuccess = useCallback((message: string, duration = 4000) => {
    showToast(message, 'success', duration);
  }, [showToast]);

  const showError = useCallback((message: string, duration = 8000) => {
    showToast(message, 'error', duration);
  }, [showToast]);

  const showWarning = useCallback((message: string, duration = 6000) => {
    showToast(message, 'warning', duration);
  }, [showToast]);

  const showInfo = useCallback((message: string, duration = 4000) => {
    showToast(message, 'info', duration);
  }, [showToast]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showWarning, showInfo }}>
      {children}
      
      <Snackbar
        open={!!toast}
        autoHideDuration={toast?.duration || 6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {toast && (
          <Alert
            onClose={handleClose}
            severity={toast.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {toast.message}
          </Alert>
        )}
      </Snackbar>
    </ToastContext.Provider>
  );
};