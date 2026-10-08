import type {
  Collection,
  CollectionMembership,
  CollectionSummary,
  SizeCoverage,
} from '@/types/collection';
import type { Plant, PlantSummary } from '@/types/plant';

export interface NewCollectionButtonProps {
  onCreated: (collection: Collection) => void;
}

export interface NewCollectionModalProps {
  onClose: () => void;
  onCreated: (collection: Collection) => void;
}

export interface CollectionGridProps {
  collections: CollectionSummary[];
  onOpen: (collectionId: number) => void;
}

export interface CollectionCardProps {
  collection: CollectionSummary;
  onOpen: (collectionId: number) => void;
}

export interface CollectionMosaicProps {
  urls: string[];
}

export interface SizeCoverageDotsProps {
  coverage: SizeCoverage[];
}

export interface CollectionModalProps {
  collectionId: number;
  onClose: () => void;
  onOpenPlant: (plantId: number) => void;
}

export interface CollectionModalHeaderProps {
  titleId: string;
  collection: Collection;
  onAddPlants: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export interface CollectionTitleProps {
  titleId: string;
  collection: Collection;
}

export interface CollectionRenameFormProps {
  collection: Collection;
  onDone: () => void;
}

export interface SizeStaircaseProps {
  collection: Collection;
}

export interface StaircaseStepProps {
  plant: PlantSummary;
  coverage: SizeCoverage[];
  index: number;
}

export interface CollectionPlantListProps {
  collection: Collection;
  onOpenPlant: (plantId: number) => void;
}

export interface CollectionPlantRowProps {
  plant: PlantSummary;
  removeLabel: string;
  onOpen: (plantId: number) => void;
  onRemove: (plant: PlantSummary) => void;
}

export interface DeleteCollectionDialogProps {
  collection: Collection;
  onCancel: () => void;
  onDeleted: () => void;
}

export interface CollectionPickerProps {
  plant: Plant;
}

export interface CollectionPickerPanelProps {
  id: string;
  membership: CollectionMembership;
  onCreateCollection: () => void;
}

export type FavoriteButtonPlant = Pick<
  PlantSummary,
  'id' | 'commonName' | 'favorite'
>;

export type FavoriteButtonVariant = 'muted' | 'glass';

export interface FavoriteButtonProps {
  plant: FavoriteButtonPlant;
  variant?: FavoriteButtonVariant;
  className?: string;
}
