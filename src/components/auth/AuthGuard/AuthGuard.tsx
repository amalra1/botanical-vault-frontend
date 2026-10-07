'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useHasAuthToken } from '@/hooks/useHasAuthToken';
import { useIsClient } from '@/hooks/useIsClient';
import type { AuthGuardProps } from '@/types/components/auth';

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const isClient = useIsClient();
  const hasToken = useHasAuthToken();

  useEffect(() => {
    if (isClient && !hasToken) {
      router.replace(ROUTES.login);
    }
  }, [isClient, hasToken, router]);

  return <div hidden={!hasToken}>{children}</div>;
}
