import { Icon } from '@/components/ui/Icon/Icon';
import { copy } from '@/data/copy';
import { useCollections } from '@/hooks/useCollections';
import type { CollectionPickerPanelProps } from '@/types/components/collections';
import styles from './CollectionPickerPanel.module.css';

const PICKER_COPY = copy.collectionPicker;

export function CollectionPickerPanel({
  id,
  membership,
  onCreateCollection,
}: CollectionPickerPanelProps) {
  const { data, isLoading } = useCollections();
  const collections = data?.filter((collection) => !collection.favorites);
  const emptyLabel = isLoading ? PICKER_COPY.loading : PICKER_COPY.error;

  return (
    <div id={id} className={styles.panel}>
      <p className={styles.title}>{PICKER_COPY.title}</p>
      {collections && collections.length > 0 && (
        <ul className={styles.options}>
          {collections.map((collection) => (
            <li key={collection.id}>
              <label className={styles.option}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={membership.selectedIds.has(collection.id)}
                  onChange={(event) =>
                    membership.update(collection.id, event.target.checked)
                  }
                />
                {collection.name}
              </label>
            </li>
          ))}
        </ul>
      )}
      {collections?.length === 0 && (
        <p className={styles.note}>{PICKER_COPY.empty}</p>
      )}
      {!collections && <p className={styles.note}>{emptyLabel}</p>}
      <button
        type="button"
        className={styles.create}
        onClick={onCreateCollection}
      >
        <Icon name="plus" />
        {PICKER_COPY.new}
      </button>
    </div>
  );
}
