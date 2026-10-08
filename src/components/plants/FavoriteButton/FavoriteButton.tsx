'use client';

import { IconButton } from '@/components/ui/IconButton/IconButton';
import { copy } from '@/data/copy';
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';
import { cx } from '@/lib/classNames';
import { formatCopy } from '@/lib/formatCopy';
import type { FavoriteButtonProps } from '@/types/components/collections';
import styles from './FavoriteButton.module.css';

export function FavoriteButton({
  plant,
  variant = 'muted',
  className,
}: FavoriteButtonProps) {
  const { toggle, isPending } = useFavoriteToggle(plant);

  return (
    <IconButton
      icon="heart"
      label={formatCopy(copy.favorite.toggle, { name: plant.commonName })}
      variant={variant}
      aria-pressed={plant.favorite}
      aria-busy={isPending || undefined}
      className={cx(styles.favorite, className)}
      onClick={toggle}
    />
  );
}
