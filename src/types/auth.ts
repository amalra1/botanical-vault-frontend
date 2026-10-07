import type { z } from 'zod';
import type { loginSchema } from '@/schemas/loginSchema';

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
}
