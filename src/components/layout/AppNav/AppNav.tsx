'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import type { NavItem } from '@/types/components/layout';
import styles from './AppNav.module.css';

const NAV_ITEMS: NavItem[] = [
  { href: ROUTES.plants, label: copy.nav.plants },
  { href: ROUTES.collections, label: copy.nav.collections },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav aria-label={copy.nav.label}>
      <ul className={styles.list}>
        {NAV_ITEMS.map(({ href, label }) => {
          const isCurrent = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isCurrent ? 'page' : undefined}
                className={cx(styles.link, isCurrent && styles.current)}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
