import type { ComponentPropsWithRef } from 'react';

export interface PagePlaceholderProps {
  title: string;
  description: string;
}

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  isLoading?: boolean;
}

export interface TextFieldProps extends ComponentPropsWithRef<'input'> {
  label: string;
  error?: string;
}
