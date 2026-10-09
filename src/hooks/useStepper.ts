import { useCallback, useState } from 'react';
import { FIRST_STEP, STEP_DELTA } from '@/constants/stepper';
import { clampStep, isFirstStep, isLastStep } from '@/lib/stepper';
import type { Stepper } from '@/types/stepper';

export function useStepper(count: number): Stepper {
  const [index, setIndex] = useState(FIRST_STEP);

  const next = useCallback(() => {
    setIndex((current) => clampStep(current + STEP_DELTA, count));
  }, [count]);

  const back = useCallback(() => {
    setIndex((current) => clampStep(current - STEP_DELTA, count));
  }, [count]);

  return {
    index,
    isFirst: isFirstStep(index),
    isLast: isLastStep(index, count),
    next,
    back,
  };
}
