'use client';

import { useId } from 'react';
import type { KeyboardEvent } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { Modal } from '@/components/ui/Modal/Modal';
import { ARROW_LEFT_KEY, ARROW_RIGHT_KEY } from '@/constants/keys';
import { STEP_NUMBER_OFFSET } from '@/constants/stepper';
import { TUTORIAL_STEPS } from '@/constants/tutorial';
import { copy } from '@/data/copy';
import { useStepper } from '@/hooks/useStepper';
import type { TutorialModalProps } from '@/types/components/tutorial';
import { TutorialProgress } from './TutorialProgress';
import { TutorialStepContent } from './TutorialStepContent';
import styles from './TutorialModal.module.css';

const TUTORIAL_COPY = copy.tutorial;
const STEP_COUNT = TUTORIAL_STEPS.length;

export function TutorialModal({ onClose }: TutorialModalProps) {
  const titleId = useId();
  const textId = useId();
  const { index, isFirst, isLast, next, back } = useStepper(STEP_COUNT);
  const step = TUTORIAL_STEPS[index];

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ARROW_RIGHT_KEY) {
      next();
    }
    if (event.key === ARROW_LEFT_KEY) {
      back();
    }
  };

  return (
    <Modal
      labelledBy={titleId}
      describedBy={textId}
      onClose={onClose}
      className={styles.dialog}
    >
      <div className={styles.tutorial} onKeyDown={handleKeyDown}>
        <div className={styles.top}>
          <TutorialStepContent
            key={step.id}
            step={step}
            titleId={titleId}
            textId={textId}
          />
          <IconButton
            icon="close"
            label={TUTORIAL_COPY.close}
            onClick={onClose}
          />
        </div>
        <div className={styles.footer}>
          <TutorialProgress
            current={index + STEP_NUMBER_OFFSET}
            total={STEP_COUNT}
          />
          <div className={styles.actions}>
            <Button variant="secondary" onClick={isFirst ? onClose : back}>
              {isFirst ? TUTORIAL_COPY.skip : TUTORIAL_COPY.back}
            </Button>
            <Button onClick={isLast ? onClose : next}>
              {isLast ? TUTORIAL_COPY.done : TUTORIAL_COPY.next}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
