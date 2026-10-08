export type VinePosition =
  | 'topRight'
  | 'bottomLeft'
  | 'topLeft'
  | 'headerLeft'
  | 'headerRight'
  | 'titleLeft'
  | 'titleRight';

export interface VineLeaf {
  x: number;
  y: number;
  angle: number;
  scale: number;
}

export interface Vine {
  position: VinePosition;
  viewBox: string;
  stems: string[];
  leaves: VineLeaf[];
}
