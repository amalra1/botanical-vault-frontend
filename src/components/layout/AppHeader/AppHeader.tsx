import { LogoutButton } from '@/components/auth/LogoutButton/LogoutButton';
import { NewPlantButton } from '@/components/plants/NewPlantButton/NewPlantButton';
import { copy } from '@/data/copy';
import styles from './AppHeader.module.css';

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span className={styles.brand}>{copy.metadata.title}</span>
        <div className={styles.actions}>
          <NewPlantButton />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
