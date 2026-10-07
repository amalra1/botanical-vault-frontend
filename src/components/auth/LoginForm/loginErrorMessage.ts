import { API_ERROR_CODES } from '@/constants/apiErrorCodes';
import { copy } from '@/data/copy';
import { getApiErrorCode } from '@/lib/apiError';

export function loginErrorMessage(error: unknown) {
  return getApiErrorCode(error) === API_ERROR_CODES.invalidCredentials
    ? copy.login.errors.invalidCredentials
    : copy.login.errors.unexpected;
}
