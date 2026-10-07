import { z } from 'zod';
import { copy } from '@/data/copy';

const LOGIN_ERRORS = copy.login.errors;

export const loginSchema = z.object({
  email: z.email(LOGIN_ERRORS.emailInvalid),
  password: z.string().min(1, LOGIN_ERRORS.passwordRequired),
});
