'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon/Icon';
import { useOutsidePointerDown } from '@/hooks/useOutsidePointerDown';
import { handleLocalEscape } from '@/lib/localEscape';
import type { SelectPopoverProps, SelectValue } from '@/types/components/ui';
import { SelectPopoverPanel } from './SelectPopoverPanel';
import styles from './SelectPopover.module.css';

export function SelectPopover<T extends SelectValue>({
  triggerLabel,
  options,
  isSelected,
  onSelect,
  closeOnSelect = false,
  searchLabel,
  emptyLabel,
}: SelectPopoverProps<T>) {
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  useOutsidePointerDown(containerRef, isOpen, close);

  const closeAndFocusTrigger = () => {
    close();
    triggerRef.current?.focus();
  };

  const select = (value: T) => {
    onSelect(value);
    if (closeOnSelect) {
      closeAndFocusTrigger();
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.picker}
      onKeyDown={(event) => {
        if (isOpen) {
          handleLocalEscape(event, closeAndFocusTrigger);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        title={triggerLabel}
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className={styles.value}>{triggerLabel}</span>
        <Icon name="chevronDown" className={styles.chevron} />
      </button>
      {isOpen && (
        <SelectPopoverPanel
          id={panelId}
          options={options}
          isSelected={isSelected}
          onSelect={select}
          searchLabel={searchLabel}
          emptyLabel={emptyLabel}
        />
      )}
    </div>
  );
}
