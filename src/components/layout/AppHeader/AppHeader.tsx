import { LogoutButton } from '@/components/auth/LogoutButton/LogoutButton';
import { copy } from '@/data/copy';
import styles from './AppHeader.module.css';

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span className={styles.brand}>{copy.metadata.title}</span>
        <LogoutButton />
      </div>
    </header>
  );
}
