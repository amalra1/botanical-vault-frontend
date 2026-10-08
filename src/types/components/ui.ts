import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { ICON_PATHS } from '@/constants/icons';

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

export type IconName = keyof typeof ICON_PATHS;

export interface IconProps {
  name: IconName;
  className?: string;
}

export type IconButtonVariant = 'muted' | 'glass';

export interface IconButtonProps extends ComponentPropsWithRef<'button'> {
  icon: IconName;
  label: string;
  variant?: IconButtonVariant;
}

export interface ModalProps {
  labelledBy: string;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

export interface SegmentedOption {
  value: number;
  label: string;
}

export type SegmentedControlSize = 'sm' | 'md';

export interface SegmentedControlProps {
  label?: string;
  labelledBy?: string;
  options: SegmentedOption[];
  value: number | null;
  onChange: (value: number) => void;
  size?: SegmentedControlSize;
  className?: string;
}

export interface ToggleChipProps extends ComponentPropsWithRef<'button'> {
  pressed: boolean;
}

export interface TextAreaFieldProps extends ComponentPropsWithRef<'textarea'> {
  label: string;
  optionalLabel?: string;
}

export interface FileDropButtonProps {
  accept: string;
  onFiles: (files: File[]) => void;
  className?: string;
  children: ReactNode;
}

export interface FieldGroupProps {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}
