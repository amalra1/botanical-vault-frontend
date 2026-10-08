import {
  ICON_PATHS,
  ICON_STROKE_WIDTH,
  ICON_VIEW_BOX,
} from '@/constants/icons';
import { cx } from '@/lib/classNames';
import type { IconProps } from '@/types/components/ui';
import styles from './Icon.module.css';

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={cx(styles.icon, className)}
      viewBox={ICON_VIEW_BOX}
      fill="none"
      stroke="currentColor"
      strokeWidth={ICON_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
