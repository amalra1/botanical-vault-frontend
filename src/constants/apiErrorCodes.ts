export const API_ERROR_CODES = {
  invalidCredentials: 'INVALID_CREDENTIALS',
  tooManyLoginAttempts: 'TOO_MANY_LOGIN_ATTEMPTS',
  duplicateName: 'DUPLICATE_NAME',
  invalidImageFormat: 'INVALID_IMAGE_FORMAT',
  fileTooLarge: 'FILE_TOO_LARGE',
  duplicateImage: 'DUPLICATE_IMAGE',
  resourceNotFound: 'RESOURCE_NOT_FOUND',
  favoritesLocked: 'FAVORITES_LOCKED',
  reassignmentRequired: 'REASSIGNMENT_REQUIRED',
  lastTaxonomyItem: 'LAST_TAXONOMY_ITEM',
} as const;
