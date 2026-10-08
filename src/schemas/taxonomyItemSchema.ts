import { z } from 'zod';
import {
  TAXONOMY_DESCRIPTION_MAX_LENGTH,
  TAXONOMY_NAME_MAX_LENGTH,
} from '@/constants/organize';
import { copy } from '@/data/copy';
import { formatCopy } from '@/lib/formatCopy';

const ERRORS = copy.organize.errors;

function tooLong(max: number) {
  return formatCopy(ERRORS.nameTooLong, { max });
}

export const taxonomyItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, ERRORS.nameRequired)
    .max(TAXONOMY_NAME_MAX_LENGTH, tooLong(TAXONOMY_NAME_MAX_LENGTH)),
  description: z
    .string()
    .trim()
    .max(
      TAXONOMY_DESCRIPTION_MAX_LENGTH,
      tooLong(TAXONOMY_DESCRIPTION_MAX_LENGTH),
    ),
});
