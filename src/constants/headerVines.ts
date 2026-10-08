import type { Vine } from '@/types/vines';

const HEADER_VINE_VIEW_BOX = '0 0 240 96';
const HEADER_VINE_STEMS = [
  'M-4 34 C 30 56, 70 62, 110 56 S 180 40, 228 50',
  'M70 60 C 80 72, 76 84, 62 92',
];
const HEADER_VINE_LEAVES = [
  { x: 18, y: 45, angle: 70, scale: 0.8 },
  { x: 46, y: 55, angle: -20, scale: 0.7 },
  { x: 88, y: 58, angle: 75, scale: 0.9 },
  { x: 126, y: 53, angle: -25, scale: 0.7 },
  { x: 164, y: 45, angle: 55, scale: 0.8 },
  { x: 204, y: 46, angle: -15, scale: 0.6 },
  { x: 76, y: 78, angle: 120, scale: 0.7 },
  { x: 64, y: 90, angle: 160, scale: 0.6 },
];

export const HEADER_VINES: Vine[] = [
  {
    position: 'headerLeft',
    viewBox: HEADER_VINE_VIEW_BOX,
    stems: HEADER_VINE_STEMS,
    leaves: HEADER_VINE_LEAVES,
  },
  {
    position: 'headerRight',
    viewBox: HEADER_VINE_VIEW_BOX,
    stems: HEADER_VINE_STEMS,
    leaves: HEADER_VINE_LEAVES,
  },
];
