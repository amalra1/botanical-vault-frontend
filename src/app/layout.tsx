import type { Metadata } from 'next';
import { SnackbarViewport } from '@/components/ui/SnackbarViewport/SnackbarViewport';
import { SnackbarProvider } from '@/contexts/SnackbarContext';
import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import { fontVariables } from './fonts';
import '@/styles/tokens.css';
import '@/styles/reset.css';
import '@/styles/focus.css';
import '@/styles/motion.css';
import '@/styles/utilities.css';

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={cx(...fontVariables)}>
      <body>
        <SnackbarProvider>
          {children}
          <SnackbarViewport />
        </SnackbarProvider>
      </body>
    </html>
  );
}
