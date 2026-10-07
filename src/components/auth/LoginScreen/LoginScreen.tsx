import { copy } from '@/data/copy';
import { LoginForm } from '../LoginForm/LoginForm';
import styles from './LoginScreen.module.css';

export function LoginScreen() {
  return (
    <main className={styles.screen}>
      <section className={styles.card} aria-labelledby="login-title">
        <header className={styles.header}>
          <h1 id="login-title" className={styles.title}>
            {copy.login.title}
          </h1>
          <p className={styles.subtitle}>{copy.login.subtitle}</p>
        </header>
        <LoginForm />
      </section>
    </main>
  );
}
