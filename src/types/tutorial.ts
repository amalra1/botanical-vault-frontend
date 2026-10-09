import type { IconName } from '@/types/components/ui';
import type { Copy } from '@/types/copy';

export type TutorialStepId = keyof Copy['tutorial']['steps'];

export interface TutorialStep {
  id: TutorialStepId;
  icon: IconName;
}
