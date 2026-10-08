import type { DraftImage } from './plantImage';
import type { Plant, PlantFormValues } from './plant';
import type { Taxonomies } from './taxonomy';

export type PlantModalMode = 'detail' | 'edit';

export interface PlantModalState {
  plantId: number;
  mode: PlantModalMode;
}

export interface PlantModalController {
  state: PlantModalState | null;
  openDetail: (plantId: number) => void;
  openEdit: () => void;
  backToDetail: () => void;
  close: () => void;
}

export interface PlantEditData {
  plant: Plant;
  taxonomies: Taxonomies;
}

export interface PlantSaveOptions {
  plant?: Plant;
  images: DraftImage[];
  onSaved: () => void;
}

export interface PlantSave {
  submit: (values: PlantFormValues) => Promise<void>;
  submitError: string | null;
}
