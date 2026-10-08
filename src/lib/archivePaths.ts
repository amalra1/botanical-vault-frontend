import {
  FILE_EXTENSION,
  FIRST_DUPLICATE_NUMBER,
  FORBIDDEN_FILENAME_CHARACTERS,
  LEADING_DOTS,
  PATH_SEPARATOR,
  REPEATED_SPACES,
} from '@/constants/archive';
import { PNG_EXTENSION } from '@/constants/upload';
import { copy } from '@/data/copy';
import type {
  ArchiveEntry,
  ArchiveFolder,
  CollectionImage,
} from '@/types/collection';

export function safeFileSegment(name: string) {
  const cleaned = name
    .replace(FORBIDDEN_FILENAME_CHARACTERS, ' ')
    .replace(REPEATED_SPACES, ' ')
    .trim()
    .replace(LEADING_DOTS, '')
    .trim();
  return cleaned || copy.collectionModal.archive.untitled;
}

function withPngExtension(filename: string) {
  return filename.toLowerCase().endsWith(PNG_EXTENSION)
    ? filename
    : `${filename}${PNG_EXTENSION}`;
}

function numbered(name: string, number: number) {
  const extension = name.match(FILE_EXTENSION)?.[0] ?? '';
  const base = name.slice(0, name.length - extension.length);
  return `${base} (${number})${extension}`;
}

export function uniqueName(name: string, usedNames: Set<string>) {
  let candidate = name;
  let number = FIRST_DUPLICATE_NUMBER;
  while (usedNames.has(candidate.toLowerCase())) {
    candidate = numbered(name, number);
    number += 1;
  }
  usedNames.add(candidate.toLowerCase());
  return candidate;
}

function folderOf(
  image: CollectionImage,
  folders: Map<number, ArchiveFolder>,
  usedFolderNames: Set<string>,
) {
  const existing = folders.get(image.plantId);
  if (existing) {
    return existing;
  }
  const folder: ArchiveFolder = {
    name: uniqueName(safeFileSegment(image.commonName), usedFolderNames),
    usedFileNames: new Set(),
  };
  folders.set(image.plantId, folder);
  return folder;
}

export function archiveEntries(images: CollectionImage[]): ArchiveEntry[] {
  const folders = new Map<number, ArchiveFolder>();
  const usedFolderNames = new Set<string>();
  return images.map((image) => {
    const folder = folderOf(image, folders, usedFolderNames);
    const filename = uniqueName(
      withPngExtension(safeFileSegment(image.originalFilename)),
      folder.usedFileNames,
    );
    return {
      path: `${folder.name}${PATH_SEPARATOR}${filename}`,
      url: image.url,
    };
  });
}
