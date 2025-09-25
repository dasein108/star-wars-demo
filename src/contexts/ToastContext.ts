import { createContext } from 'react';
import { ToastContextType } from '../hooks/useToast';

export const ToastContext = createContext<ToastContextType | undefined>(undefined);