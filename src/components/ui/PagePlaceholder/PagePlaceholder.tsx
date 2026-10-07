import type { PagePlaceholderProps } from '@/types/components/ui';
import styles from './PagePlaceholder.module.css';

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </main>
  );
}
