import { FIRST_STEP } from '@/constants/stepper';

export function clampStep(index: number, count: number) {
  const lastStep = Math.max(count - 1, FIRST_STEP);
  return Math.min(Math.max(index, FIRST_STEP), lastStep);
}

export function isFirstStep(index: number) {
  return index === FIRST_STEP;
}

export function isLastStep(index: number, count: number) {
  return index === clampStep(count - 1, count);
}
