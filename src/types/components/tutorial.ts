import type { TutorialStep } from '@/types/tutorial';

export interface TutorialModalProps {
  onClose: () => void;
}

export interface TutorialStepContentProps {
  step: TutorialStep;
  titleId: string;
  textId: string;
}

export interface TutorialProgressProps {
  current: number;
  total: number;
}
