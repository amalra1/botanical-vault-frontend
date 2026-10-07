import { AuthGuard } from '@/components/auth/AuthGuard/AuthGuard';
import { AppHeader } from '@/components/layout/AppHeader/AppHeader';

export default function AppLayout({ children }: LayoutProps<'/'>) {
  return (
    <AuthGuard>
      <AppHeader />
      {children}
    </AuthGuard>
  );
}
