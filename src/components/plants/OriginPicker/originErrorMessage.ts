import { API_ERROR_CODES } from '@/constants/apiErrorCodes';
import { copy } from '@/data/copy';
import { getApiErrorCode } from '@/lib/apiError';

export function originErrorMessage(error: unknown) {
  return getApiErrorCode(error) === API_ERROR_CODES.duplicateName
    ? copy.plantForm.errors.duplicateOrigin
    : copy.plantForm.errors.originUnexpected;
}
