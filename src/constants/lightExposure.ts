export const LIGHT_EXPOSURES = ['SHADE', 'PARTIAL_SHADE', 'FULL_SUN'] as const;

export const LIGHT_EXPOSURE_PARAMS = {
  SHADE: 'sombra',
  PARTIAL_SHADE: 'meia-sombra',
  FULL_SUN: 'sol-pleno',
} as const;

export const LIGHT_EXPOSURE_ICONS = {
  SHADE: 'shade',
  PARTIAL_SHADE: 'sunPartial',
  FULL_SUN: 'sun',
} as const;

export const LIGHT_ARC = {
  width: 260,
  height: 140,
  centerX: 220,
  centerY: 124,
  radiusX: 170,
  radiusY: 100,
  sunriseAngle: 180,
  zenithAngle: 90,
} as const;

export const LIGHT_STOP_ANGLES = {
  SHADE: 162,
  PARTIAL_SHADE: 125,
  FULL_SUN: 92,
} as const;

export const LIGHT_CANOPY = [
  { cx: 32, cy: 104, rx: 26, ry: 20, tone: 'dark' },
  { cx: 22, cy: 84, rx: 18, ry: 16, tone: 'base' },
  { cx: 48, cy: 116, rx: 22, ry: 10, tone: 'light' },
] as const;
