'use client';

import { useCallback, useState } from 'react';
import type { AnimationEvent } from 'react';
import { Icon } from '@/components/ui/Icon/Icon';
import { SNACKBAR_DURATION_MS } from '@/constants/snackbar';
import { copy } from '@/data/copy';
import { useDismissTimer } from '@/hooks/useDismissTimer';
import { cx } from '@/lib/classNames';
import type { SnackbarProps } from '@/types/components/ui';
import styles from './Snackbar.module.css';

const PROGRESS_STYLE = { animationDuration: `${SNACKBAR_DURATION_MS}ms` };

export function Snackbar({ message, onDismiss }: SnackbarProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const leave = useCallback(() => setIsLeaving(true), []);
  const { isPaused, pause, resume } = useDismissTimer(
    SNACKBAR_DURATION_MS,
    leave,
  );

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (isLeaving && event.target === event.currentTarget) {
      onDismiss(message.id);
    }
  };

  return (
    <div
      className={cx(styles.snackbar, isLeaving && styles.leaving)}
      data-paused={isPaused || undefined}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onAnimationEnd={handleAnimationEnd}
    >
      <span className={styles.sprout}>
        <Icon name="leaf" className={styles.leaf} />
      </span>
      <div className={styles.body}>
        <p className={styles.title}>{message.title}</p>
        <p className={styles.description}>{message.description}</p>
      </div>
      <button
        type="button"
        className={styles.close}
        aria-label={copy.snackbar.dismiss}
        title={copy.snackbar.dismiss}
        onClick={leave}
      >
        <Icon name="close" />
      </button>
      <span className={styles.progress} style={PROGRESS_STYLE} />
    </div>
  );
}
