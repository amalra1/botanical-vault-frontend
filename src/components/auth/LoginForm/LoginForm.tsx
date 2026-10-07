'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { TextField } from '@/components/ui/TextField/TextField';
import { ROUTES } from '@/constants/routes';
import { copy } from '@/data/copy';
import { writeAuthToken } from '@/lib/authToken';
import { loginSchema } from '@/schemas/loginSchema';
import { authService } from '@/services/authService';
import type { LoginFormValues } from '@/types/auth';
import { loginErrorMessage } from './loginErrorMessage';
import styles from './LoginForm.module.css';

const LOGIN_COPY = copy.login;
const EMPTY_LOGIN: LoginFormValues = { email: '', password: '' };

export function LoginForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: EMPTY_LOGIN,
  });

  const submit = async (values: LoginFormValues) => {
    setSubmitError(null);
    try {
      const { token } = await authService.login(values);
      writeAuthToken(token);
      router.replace(ROUTES.plants);
    } catch (error) {
      setSubmitError(loginErrorMessage(error));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)} noValidate>
      <TextField
        label={LOGIN_COPY.emailLabel}
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <TextField
        label={LOGIN_COPY.passwordLabel}
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />
      {submitError && (
        <p role="alert" className={styles.submitError}>
          {submitError}
        </p>
      )}
      <Button type="submit" isLoading={isSubmitting} className={styles.submit}>
        {isSubmitting ? LOGIN_COPY.submitting : LOGIN_COPY.submit}
      </Button>
    </form>
  );
}
