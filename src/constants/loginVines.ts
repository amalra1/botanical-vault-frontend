import type { Vine } from '@/types/vines';

export const LEAF_PATH = 'M0 0 C 7 -11, 21 -11, 28 0 C 21 11, 7 11, 0 0 Z';
export const LEAF_TONES = ['dark', 'base', 'light'] as const;
export const STEM_DELAY_STEP_MS = 180;
export const LEAF_DELAY_START_MS = 500;
export const LEAF_DELAY_STEP_MS = 70;

export const LOGIN_VINES: Vine[] = [
  {
    position: 'topRight',
    viewBox: '0 0 280 280',
    stems: [
      'M60 240 C 90 180, 128 168, 150 126 S 198 64, 238 52 S 266 22, 250 10',
      'M88 220 C 128 206, 168 214, 206 184 S 246 150, 262 160',
    ],
    leaves: [
      { x: 122, y: 160, angle: -40, scale: 1.1 },
      { x: 146, y: 128, angle: 200, scale: 1 },
      { x: 168, y: 100, angle: -20, scale: 1.2 },
      { x: 196, y: 74, angle: 210, scale: 0.9 },
      { x: 228, y: 56, angle: -30, scale: 1 },
      { x: 250, y: 28, angle: 250, scale: 0.8 },
      { x: 150, y: 210, angle: 10, scale: 1 },
      { x: 192, y: 194, angle: -60, scale: 1.1 },
      { x: 232, y: 162, angle: 30, scale: 0.9 },
    ],
  },
  {
    position: 'bottomLeft',
    viewBox: '0 0 300 260',
    stems: [
      'M250 80 C 206 118, 172 108, 140 150 S 80 214, 40 202 S 8 168, 22 148',
      'M222 104 C 206 156, 196 196, 210 244',
    ],
    leaves: [
      { x: 184, y: 118, angle: 160, scale: 1.1 },
      { x: 150, y: 140, angle: 230, scale: 1 },
      { x: 120, y: 174, angle: 140, scale: 1.2 },
      { x: 88, y: 196, angle: 210, scale: 1 },
      { x: 56, y: 206, angle: 160, scale: 0.9 },
      { x: 26, y: 186, angle: 260, scale: 0.8 },
      { x: 212, y: 150, angle: 20, scale: 0.9 },
      { x: 204, y: 190, angle: 150, scale: 1 },
      { x: 208, y: 228, angle: 40, scale: 0.8 },
    ],
  },
  {
    position: 'topLeft',
    viewBox: '0 0 170 170',
    stems: ['M140 110 C 108 82, 76 70, 38 32'],
    leaves: [
      { x: 108, y: 84, angle: 200, scale: 1 },
      { x: 80, y: 66, angle: 250, scale: 0.9 },
      { x: 52, y: 44, angle: 200, scale: 0.8 },
    ],
  },
];
