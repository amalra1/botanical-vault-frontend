import { PlantTags } from '@/components/plants/PlantTags/PlantTags';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { copy } from '@/data/copy';
import type { PlantDetailHeaderProps } from '@/types/components/plantDetail';
import styles from './PlantDetailHeader.module.css';

export function PlantDetailHeader({
  titleId,
  plant,
  origins,
  onEdit,
  onClose,
}: PlantDetailHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.identity}>
        <div>
          <h2 id={titleId} className={styles.title}>
            {plant.commonName}
          </h2>
          {plant.scientificName && (
            <p className={styles.scientific}>{plant.scientificName}</p>
          )}
        </div>
        <PlantTags plant={plant} origins={origins} size={plant.size} />
      </div>
      <div className={styles.actions}>
        <IconButton
          icon="pencil"
          label={copy.plantDetail.edit}
          onClick={onEdit}
        />
        <IconButton icon="close" label={copy.modal.close} onClick={onClose} />
      </div>
    </header>
  );
}
