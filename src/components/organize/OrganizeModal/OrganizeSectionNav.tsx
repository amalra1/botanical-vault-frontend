import { LogoutButton } from '@/components/auth/LogoutButton/LogoutButton';
import { Icon } from '@/components/ui/Icon/Icon';
import {
  ORGANIZE_SECTION_CONFIG,
  ORGANIZE_SECTIONS,
} from '@/constants/organize';
import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import type { OrganizeSectionNavProps } from '@/types/components/organize';
import styles from './OrganizeSectionNav.module.css';

export function OrganizeSectionNav({
  taxonomies,
  activeKind,
  onSelect,
}: OrganizeSectionNavProps) {
  return (
    <aside className={styles.aside}>
      <nav aria-label={copy.organize.sectionsLabel} className={styles.panel}>
        {ORGANIZE_SECTIONS.map((kind) => {
          const isActive = kind === activeKind;
          return (
            <button
              key={kind}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              className={cx(styles.item, isActive && styles.active)}
              onClick={() => onSelect(kind)}
            >
              <span className={styles.icon}>
                <Icon name={ORGANIZE_SECTION_CONFIG[kind].icon} />
              </span>
              <span className={styles.label}>
                {copy.organize.sections[kind].title}
              </span>
              <span className={styles.count}>{taxonomies[kind].length}</span>
            </button>
          );
        })}
      </nav>
      <div className={styles.panel}>
        <LogoutButton />
      </div>
    </aside>
  );
}
