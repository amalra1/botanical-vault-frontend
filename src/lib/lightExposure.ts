import {
  LIGHT_ARC,
  LIGHT_EXPOSURE_PARAMS,
  LIGHT_EXPOSURES,
  LIGHT_STOP_ANGLES,
} from '@/constants/lightExposure';
import { copy } from '@/data/copy';
import { formatCopy } from '@/lib/formatCopy';
import type {
  ArcPoint,
  ArcSegment,
  LightExposure,
} from '@/types/lightExposure';

const LIGHT_COPY = copy.light;
const DEGREES_PER_HALF_TURN = 180;
const PERCENT = 100;

function scaleIndex(exposure: LightExposure) {
  return LIGHT_EXPOSURES.indexOf(exposure);
}

export function sortExposures(exposures: readonly LightExposure[]) {
  return LIGHT_EXPOSURES.filter((exposure) => exposures.includes(exposure));
}

export function toggleExposure(
  exposures: readonly LightExposure[],
  exposure: LightExposure,
) {
  return exposures.includes(exposure)
    ? sortExposures(exposures.filter((item) => item !== exposure))
    : sortExposures([...exposures, exposure]);
}

function isContiguous(sorted: LightExposure[]) {
  const span = scaleIndex(sorted[sorted.length - 1]) - scaleIndex(sorted[0]);
  return span === sorted.length - 1;
}

export function lightExposureLabel(exposures: readonly LightExposure[]) {
  const sorted = sortExposures(exposures);
  if (sorted.length === 0) {
    return null;
  }
  const first = LIGHT_COPY.options[sorted[0]];
  if (sorted.length === 1) {
    return first.label;
  }
  const last = LIGHT_COPY.options[sorted[sorted.length - 1]];
  return isContiguous(sorted)
    ? formatCopy(LIGHT_COPY.range, { from: first.label, to: last.inline })
    : formatCopy(LIGHT_COPY.pair, { first: first.label, second: last.inline });
}

export function selectedSegments(
  exposures: readonly LightExposure[],
): ArcSegment[] {
  return LIGHT_EXPOSURES.slice(1)
    .map((to, index) => ({ from: LIGHT_EXPOSURES[index], to }))
    .filter(
      ({ from, to }) => exposures.includes(from) && exposures.includes(to),
    );
}

export function arcPoint(angle: number): ArcPoint {
  const radians = (angle * Math.PI) / DEGREES_PER_HALF_TURN;
  return {
    x: LIGHT_ARC.centerX + LIGHT_ARC.radiusX * Math.cos(radians),
    y: LIGHT_ARC.centerY - LIGHT_ARC.radiusY * Math.sin(radians),
  };
}

export function stopPoint(exposure: LightExposure) {
  return arcPoint(LIGHT_STOP_ANGLES[exposure]);
}

export function arcPath(fromAngle: number, toAngle: number) {
  const start = arcPoint(fromAngle);
  const end = arcPoint(toAngle);
  const { radiusX, radiusY } = LIGHT_ARC;
  return `M ${start.x} ${start.y} A ${radiusX} ${radiusY} 0 0 1 ${end.x} ${end.y}`;
}

export function toPercent(point: ArcPoint) {
  return {
    left: `${(point.x / LIGHT_ARC.width) * PERCENT}%`,
    top: `${(point.y / LIGHT_ARC.height) * PERCENT}%`,
  };
}

export function readLightParam(value: string | null): LightExposure | null {
  return (
    LIGHT_EXPOSURES.find(
      (exposure) => LIGHT_EXPOSURE_PARAMS[exposure] === value,
    ) ?? null
  );
}

export function lightParamOf(exposure: LightExposure | null) {
  return exposure && LIGHT_EXPOSURE_PARAMS[exposure];
}
