export interface TaxonomyItem {
  id: number;
  name: string;
}

export interface SizeItem extends TaxonomyItem {
  description: string | null;
}

export interface Taxonomies {
  origins: TaxonomyItem[];
  plantTypes: TaxonomyItem[];
  sizes: SizeItem[];
  imageViews: TaxonomyItem[];
}
