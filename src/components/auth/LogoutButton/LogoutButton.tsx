'use client';

import { Button } from '@/components/ui/Button/Button';
import { copy } from '@/data/copy';
import { clearAuthToken } from '@/lib/authToken';

export function LogoutButton() {
  return (
    <Button variant="secondary" onClick={clearAuthToken}>
      {copy.header.logout}
    </Button>
  );
}
