import type { ComponentPropsWithRef } from 'react';

export interface PagePlaceholderProps {
  title: string;
  description: string;
}

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export interface TextFieldProps extends ComponentPropsWithRef<'input'> {
  label: string;
  error?: string;
}
