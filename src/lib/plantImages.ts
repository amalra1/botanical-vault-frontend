import { ALL_OPTION } from '@/constants/plantFilters';
import type { Plant, PlantFormValues, PlantImage } from '@/types/plant';
import type {
  DraftImage,
  ImageViewFilter,
  PlantImageInput,
} from '@/types/plantImage';
import type { TaxonomyItem } from '@/types/taxonomy';

export function viewsOf(images: PlantImage[]): TaxonomyItem[] {
  const views = new Map<number, TaxonomyItem>();
  images.forEach(({ view }) => views.set(view.id, view));
  return [...views.values()];
}

export function filterImagesByView(
  images: PlantImage[],
  filter: ImageViewFilter,
) {
  return filter === ALL_OPTION
    ? images
    : images.filter((image) => image.view.id === filter);
}

export function toDraftImages(plant: Plant): DraftImage[] {
  return plant.images.map((image) => ({
    id: String(image.id),
    source: { kind: 'existing', imageId: image.id },
    previewUrl: image.url,
    filename: image.originalFilename,
    viewId: image.view.id,
  }));
}

export function toImageInputs(images: DraftImage[]): PlantImageInput[] {
  return images.map(({ source, viewId }) => ({ source, viewId }));
}

export function toPlantFormValues(plant: Plant): PlantFormValues {
  return {
    commonName: plant.commonName,
    scientificName: plant.scientificName ?? '',
    originIds: plant.origins.map((origin) => origin.id),
    typeId: plant.type.id,
    sizeId: plant.size.id,
    notes: plant.notes ?? '',
  };
}
