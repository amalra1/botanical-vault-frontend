import { isAxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/api';

export function getApiErrorCode(error: unknown): string | null {
  if (!isAxiosError<ApiErrorResponse>(error)) {
    return null;
  }
  return error.response?.data?.error ?? null;
}
