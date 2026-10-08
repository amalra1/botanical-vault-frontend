'use client';

import { Icon } from '@/components/ui/Icon/Icon';
import { copy } from '@/data/copy';
import { clearAuthToken } from '@/lib/authToken';
import styles from './LogoutButton.module.css';

export function LogoutButton() {
  return (
    <button type="button" className={styles.button} onClick={clearAuthToken}>
      <Icon name="logout" />
      {copy.organize.logout}
    </button>
  );
}
