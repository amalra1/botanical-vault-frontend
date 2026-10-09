import type {
  LIGHT_CANOPY,
  LIGHT_EXPOSURE_PARAMS,
  LIGHT_EXPOSURES,
} from '@/constants/lightExposure';

export type LightExposure = (typeof LIGHT_EXPOSURES)[number];

export type LightExposureParam = (typeof LIGHT_EXPOSURE_PARAMS)[LightExposure];

export type CanopyTone = (typeof LIGHT_CANOPY)[number]['tone'];

export interface ArcPoint {
  x: number;
  y: number;
}

export interface ArcSegment {
  from: LightExposure;
  to: LightExposure;
}
