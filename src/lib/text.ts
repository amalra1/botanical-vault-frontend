const COMBINING_MARKS = /\p{M}/gu;

export function normalizeForMatch(value: string) {
  return value
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .trim()
    .toLowerCase();
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
