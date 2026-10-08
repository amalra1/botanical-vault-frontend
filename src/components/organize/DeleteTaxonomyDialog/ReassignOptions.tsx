import { useId } from 'react';
import { ORGANIZE_SECTION_CONFIG, UNASSIGN_TARGET } from '@/constants/organize';
import { copy } from '@/data/copy';
import { formatCopy } from '@/lib/formatCopy';
import type { ReassignOptionsProps } from '@/types/components/organize';
import styles from './ReassignOptions.module.css';

const DIALOG_COPY = copy.organize.deleteDialog;

export function ReassignOptions({
  kind,
  item,
  items,
  target,
  onChange,
}: ReassignOptionsProps) {
  const groupName = useId();
  const targets = items.filter((other) => other.id !== item.id);
  const { allowsUnassign } = ORGANIZE_SECTION_CONFIG[kind];

  return (
    <fieldset className={styles.group}>
      <legend className="sr-only">{DIALOG_COPY.destination}</legend>
      {targets.map((other) => (
        <label key={other.id} className={styles.option}>
          <input
            type="radio"
            name={groupName}
            className={styles.radio}
            checked={target === other.id}
            onChange={() => onChange(other.id)}
          />
          <span>
            {formatCopy(DIALOG_COPY.moveTo, { name: other.name })}
            {other.description && (
              <span className={styles.detail}>{other.description}</span>
            )}
          </span>
        </label>
      ))}
      {allowsUnassign && (
        <label className={styles.option}>
          <input
            type="radio"
            name={groupName}
            className={styles.radio}
            checked={target === UNASSIGN_TARGET}
            onChange={() => onChange(UNASSIGN_TARGET)}
          />
          <span>{DIALOG_COPY.unassign}</span>
        </label>
      )}
    </fieldset>
  );
}
