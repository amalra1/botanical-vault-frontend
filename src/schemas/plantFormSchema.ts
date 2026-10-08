import { z } from 'zod';
import { PLANT_NAME_MAX_LENGTH } from '@/constants/plantForm';
import { copy } from '@/data/copy';
import { formatCopy } from '@/lib/formatCopy';

const PLANT_ERRORS = copy.plantForm.errors;
const NAME_TOO_LONG = formatCopy(PLANT_ERRORS.nameTooLong, {
  max: PLANT_NAME_MAX_LENGTH,
});

export const plantFormSchema = z.object({
  commonName: z
    .string()
    .trim()
    .min(1, PLANT_ERRORS.commonNameRequired)
    .max(PLANT_NAME_MAX_LENGTH, NAME_TOO_LONG),
  scientificName: z.string().trim().max(PLANT_NAME_MAX_LENGTH, NAME_TOO_LONG),
  originIds: z.array(z.number()),
  typeId: z.number({ error: PLANT_ERRORS.typeRequired }),
  sizeId: z.number({ error: PLANT_ERRORS.sizeRequired }),
  notes: z.string(),
});
