import { Icon } from '@/components/ui/Icon/Icon';
import { copy } from '@/data/copy';
import type { TutorialStepContentProps } from '@/types/components/tutorial';
import styles from './TutorialStepContent.module.css';

const STEPS_COPY = copy.tutorial.steps;

export function TutorialStepContent({
  step,
  titleId,
  textId,
}: TutorialStepContentProps) {
  const stepCopy = STEPS_COPY[step.id];

  return (
    <div className={styles.step}>
      <span className={styles.badge} aria-hidden="true">
        <Icon name={step.icon} className={styles.icon} />
      </span>
      <h2 id={titleId} className={styles.title}>
        {stepCopy.title}
      </h2>
      <p id={textId} className={styles.text}>
        {stepCopy.text}
      </p>
    </div>
  );
}
