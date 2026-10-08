import { useContext } from 'react';
import { SnackbarContext } from '@/contexts/SnackbarContext';

const MISSING_PROVIDER = 'useSnackbar must be used inside SnackbarProvider';

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(MISSING_PROVIDER);
  }
  return context;
}
