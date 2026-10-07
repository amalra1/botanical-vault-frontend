import type { Metadata } from 'next';
import { copy } from '@/data/copy';
import { hankenGrotesk } from './fonts';
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
    <html lang="pt-BR" className={hankenGrotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
