import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { ICON_PATHS } from '@/constants/icons';
import type { SnackbarMessage } from '@/types/snackbar';
import type { Vine } from '@/types/vines';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

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

export type ModalRole = 'dialog' | 'alertdialog';

export interface ModalProps {
  labelledBy: string;
  describedBy?: string;
  role?: ModalRole;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

export interface ModalHeaderProps {
  titleId: string;
  title: string;
  onClose: () => void;
}

export interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  confirmingLabel: string;
  cancelLabel: string;
  isConfirming: boolean;
  isConfirmDisabled?: boolean;
  error: string | null;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

export type SegmentedValue = number | string;

export interface SegmentedOption<T extends SegmentedValue> {
  value: T;
  label: string;
}

export type SegmentedControlSize = 'sm' | 'md';

export interface SegmentedControlProps<T extends SegmentedValue> {
  label?: string;
  labelledBy?: string;
  options: SegmentedOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  size?: SegmentedControlSize;
  className?: string;
}

export type SelectValue = number | string | null;

export interface SelectOption<T extends SelectValue> {
  value: T;
  label: string;
}

export interface SelectPopoverProps<T extends SelectValue> {
  triggerLabel: string;
  options: SelectOption<T>[];
  isSelected: (value: T) => boolean;
  onSelect: (value: T) => void;
  closeOnSelect?: boolean;
  searchLabel: string;
  emptyLabel: string;
}

export interface SelectPopoverPanelProps<T extends SelectValue> {
  id: string;
  options: SelectOption<T>[];
  isSelected: (value: T) => boolean;
  onSelect: (value: T) => void;
  searchLabel: string;
  emptyLabel: string;
}

export type ViewfinderLayout = 'inline' | 'stacked';

export interface ViewfinderProps<T extends SelectValue> {
  label?: string;
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  layout?: ViewfinderLayout;
}

export interface ChoiceTileProps extends ComponentPropsWithRef<'button'> {
  pressed: boolean;
  label: string;
  caption?: string;
}

export interface TextAreaFieldProps extends ComponentPropsWithRef<'textarea'> {
  label: string;
  optionalLabel?: string;
}

export interface LoadStatusProps {
  isLoading: boolean;
  loadingLabel: string;
  errorLabel: string;
  retryLabel: string;
  onRetry: () => void;
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

export interface SnackbarProviderProps {
  children: ReactNode;
}

export interface SnackbarProps {
  message: SnackbarMessage;
  onDismiss: (id: number) => void;
}

export interface VineArtProps {
  vine: Vine;
  className?: string;
}
