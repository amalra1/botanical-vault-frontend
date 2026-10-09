import { API_ERROR_CODES } from '@/constants/apiErrorCodes';
import { copy } from '@/data/copy';
import { getApiErrorCode, getApiErrorField } from '@/lib/apiError';
import { formatCopy } from '@/lib/formatCopy';
import { retryAfterMinutes } from '@/lib/retryAfter';

const LOGIN_ERRORS = copy.login.errors;
const RETRY_AFTER_FIELD = 'retryAfterSeconds';

export function loginErrorMessage(error: unknown) {
  switch (getApiErrorCode(error)) {
    case API_ERROR_CODES.invalidCredentials:
      return LOGIN_ERRORS.invalidCredentials;
    case API_ERROR_CODES.tooManyLoginAttempts:
      return formatCopy(LOGIN_ERRORS.tooManyAttempts, {
        minutes: retryAfterMinutes(getApiErrorField(error, RETRY_AFTER_FIELD)),
      });
    default:
      return LOGIN_ERRORS.unexpected;
  }
}
