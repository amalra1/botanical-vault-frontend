import type { Plant, PlantImage } from '@/types/plant';
import type { PlantModalController } from '@/types/plantEditing';
import type { TaxonomyItem } from '@/types/taxonomy';

export interface PlantEditModalProps {
  plantId: number;
  onClose: () => void;
  onDeleted: () => void;
}

export interface DeletePlantDialogProps {
  plant: Plant;
  onCancel: () => void;
  onDeleted: () => void;
}

export interface PlantModalHostProps {
  modal: PlantModalController;
  origins: TaxonomyItem[];
}

export interface PlantDetailModalProps {
  plantId: number;
  origins: TaxonomyItem[];
  onEdit: () => void;
  onClose: () => void;
}

export interface PlantDetailHeaderProps {
  titleId: string;
  plant: Plant;
  origins: TaxonomyItem[];
  onEdit: () => void;
  onClose: () => void;
}

export interface PlantImageGalleryProps {
  images: PlantImage[];
}

export interface PlantImageCardProps {
  image: PlantImage;
}
