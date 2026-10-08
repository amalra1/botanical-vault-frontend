import { PNG_EXTENSION } from '@/constants/upload';
import { capitalize, normalizeForMatch } from './text';

const WORD_SEPARATORS = /[-_\s]+/;
const NUMBER_ONLY = /^\d+$/;

function stripExtension(filename: string) {
  return filename.toLowerCase().endsWith(PNG_EXTENSION)
    ? filename.slice(0, -PNG_EXTENSION.length)
    : filename;
}

function endsWithWords(words: string[], suffix: string[]) {
  if (suffix.length === 0 || suffix.length > words.length) {
    return false;
  }
  const tail = words.slice(words.length - suffix.length);
  return tail.every((word, index) => normalizeForMatch(word) === suffix[index]);
}

function dropTrailingNoise(words: string[], viewSuffixes: string[][]) {
  let remaining = words;
  let changed = true;
  while (changed && remaining.length > 1) {
    changed = false;
    const last = remaining[remaining.length - 1];
    const suffix = viewSuffixes.find((candidate) =>
      endsWithWords(remaining, candidate),
    );
    if (NUMBER_ONLY.test(last)) {
      remaining = remaining.slice(0, -1);
      changed = true;
    } else if (suffix && suffix.length < remaining.length) {
      remaining = remaining.slice(0, remaining.length - suffix.length);
      changed = true;
    }
  }
  return remaining;
}

export function suggestCommonName(filename: string, viewNames: string[]) {
  const words = stripExtension(filename).split(WORD_SEPARATORS).filter(Boolean);
  const viewSuffixes = viewNames.map((name) =>
    normalizeForMatch(name).split(WORD_SEPARATORS).filter(Boolean),
  );
  const nameWords = dropTrailingNoise(words, viewSuffixes);
  return capitalize(nameWords.join(' '));
}
