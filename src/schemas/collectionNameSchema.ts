import { z } from 'zod';
import { COLLECTION_NAME_MAX_LENGTH } from '@/constants/collections';
import { copy } from '@/data/copy';
import { formatCopy } from '@/lib/formatCopy';

const COLLECTION_ERRORS = copy.collections.errors;

export const collectionNameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, COLLECTION_ERRORS.nameRequired)
    .max(
      COLLECTION_NAME_MAX_LENGTH,
      formatCopy(COLLECTION_ERRORS.nameTooLong, {
        max: COLLECTION_NAME_MAX_LENGTH,
      }),
    ),
});
