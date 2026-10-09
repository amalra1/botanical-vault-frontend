const SECONDS_PER_MINUTE = 60;
const MIN_MINUTES = 1;

export function retryAfterMinutes(seconds: string | null) {
  const value = Number(seconds);
  if (!Number.isFinite(value) || value <= 0) {
    return MIN_MINUTES;
  }
  return Math.max(MIN_MINUTES, Math.ceil(value / SECONDS_PER_MINUTE));
}
