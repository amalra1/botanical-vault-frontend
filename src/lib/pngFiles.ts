import { PNG_EXTENSION, PNG_MIME_TYPE } from '@/constants/upload';
import type { SplitPngFiles } from '@/types/plant';

export function isPngFile(file: File) {
  return (
    file.type === PNG_MIME_TYPE ||
    file.name.toLowerCase().endsWith(PNG_EXTENSION)
  );
}

export function splitPngFiles(files: File[]): SplitPngFiles {
  return {
    accepted: files.filter(isPngFile),
    rejected: files.filter((file) => !isPngFile(file)),
  };
}
