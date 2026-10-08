import type { Vine } from '@/types/vines';

const TITLE_VINE_VIEW_BOX = '0 0 260 140';
const TITLE_VINE_STEMS = [
  'M0 96 C 40 70, 80 112, 124 84 S 196 50, 224 66',
  'M224 66 c 14 8, 16 26, 2 30 c -10 3, -16 -8, -8 -14 c 5 -4, 11 0, 9 5',
  'M124 84 C 132 60, 150 44, 172 40 c 10 -2, 16 6, 10 12 c -4 4, -10 0, -7 -4',
  'M64 92 C 72 110, 92 120, 112 116',
];
const TITLE_VINE_LEAVES = [
  { x: 18, y: 86, angle: -65, scale: 0.9 },
  { x: 42, y: 80, angle: 35, scale: 0.8 },
  { x: 72, y: 96, angle: -55, scale: 0.95 },
  { x: 100, y: 98, angle: 60, scale: 0.8 },
  { x: 88, y: 116, angle: 115, scale: 0.6 },
  { x: 112, y: 116, angle: 15, scale: 0.7 },
  { x: 138, y: 58, angle: -140, scale: 0.75 },
  { x: 152, y: 76, angle: 40, scale: 0.85 },
  { x: 160, y: 44, angle: -60, scale: 0.6 },
  { x: 190, y: 60, angle: -40, scale: 0.7 },
  { x: 208, y: 58, angle: 55, scale: 0.6 },
];

export const TITLE_VINES: Vine[] = [
  {
    position: 'titleLeft',
    viewBox: TITLE_VINE_VIEW_BOX,
    stems: TITLE_VINE_STEMS,
    leaves: TITLE_VINE_LEAVES,
  },
  {
    position: 'titleRight',
    viewBox: TITLE_VINE_VIEW_BOX,
    stems: TITLE_VINE_STEMS,
    leaves: TITLE_VINE_LEAVES,
  },
];
