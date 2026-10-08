'use client';

import { useEffect, useId } from 'react';
import { Snackbar } from '@/components/ui/Snackbar/Snackbar';
import { copy } from '@/data/copy';
import { useSnackbar } from '@/hooks/useSnackbar';
import { formatCopy } from '@/lib/formatCopy';

export function SnackbarViewport() {
  const hostId = useId();
  const { message, activeHostId, registerHost, dismiss } = useSnackbar();
  const visibleMessage = activeHostId === hostId ? message : null;

  useEffect(() => registerHost(hostId), [registerHost, hostId]);

  return (
    <>
      <div role="status" className="sr-only">
        {visibleMessage &&
          formatCopy(copy.snackbar.announcement, { ...visibleMessage })}
      </div>
      {visibleMessage && (
        <Snackbar
          key={visibleMessage.id}
          message={visibleMessage}
          onDismiss={dismiss}
        />
      )}
    </>
  );
}
