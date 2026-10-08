import type { ReactNode } from 'react';

export interface NavItem {
  href: string;
  label: string;
}

export interface VineFrameProps {
  children: ReactNode;
}
