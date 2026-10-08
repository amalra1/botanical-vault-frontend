import { API_ERROR_CODES } from '@/constants/apiErrorCodes';
import { copy } from '@/data/copy';
import { getApiErrorCode } from '@/lib/apiError';

const PLANT_ERRORS = copy.plantForm.errors;

export function plantSaveErrorMessage(error: unknown) {
  switch (getApiErrorCode(error)) {
    case API_ERROR_CODES.invalidImageFormat:
      return PLANT_ERRORS.invalidImage;
    case API_ERROR_CODES.fileTooLarge:
      return PLANT_ERRORS.fileTooLarge;
    default:
      return PLANT_ERRORS.unexpected;
  }
}
