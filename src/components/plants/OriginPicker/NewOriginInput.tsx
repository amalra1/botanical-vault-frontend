'use client';

import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { ORIGIN_NAME_MAX_LENGTH } from '@/constants/plantForm';
import { copy } from '@/data/copy';
import { taxonomyService } from '@/services/taxonomyService';
import type { NewOriginInputProps } from '@/types/components/plants';
import { originErrorMessage } from './originErrorMessage';
import styles from './OriginPicker.module.css';

const FIELDS_COPY = copy.plantForm.fields;

export function NewOriginInput({ onCreated }: NewOriginInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const close = () => {
    setIsOpen(false);
    setName('');
    setError(null);
  };

  const create = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError(copy.plantForm.errors.originNameRequired);
      return;
    }
    setIsSaving(true);
    try {
      onCreated(await taxonomyService.createOrigin(trimmed));
      close();
    } catch (createError) {
      setError(originErrorMessage(createError));
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      void create();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        className={styles.newOrigin}
        onClick={() => setIsOpen(true)}
      >
        <Icon name="plus" className={styles.newOriginIcon} />
        {FIELDS_COPY.newOrigin}
      </button>
    );
  }

  return (
    <div className={styles.newOriginForm}>
      <input
        className={styles.newOriginInput}
        aria-label={FIELDS_COPY.newOriginName}
        aria-invalid={error ? true : undefined}
        placeholder={FIELDS_COPY.newOriginPlaceholder}
        maxLength={ORIGIN_NAME_MAX_LENGTH}
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <Button isLoading={isSaving} onClick={() => void create()}>
        {FIELDS_COPY.addOrigin}
      </Button>
      <Button variant="secondary" onClick={close}>
        {FIELDS_COPY.cancelOrigin}
      </Button>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
