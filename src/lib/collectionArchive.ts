import { zip } from 'fflate';
import type { AsyncZippable } from 'fflate';
import { STORE_LEVEL, ZIP_MIME_TYPE } from '@/constants/archive';
import type { ArchiveEntry } from '@/types/collection';
import { fetchImageBlob } from './imageFiles';

async function fetchEntryBytes({ url }: ArchiveEntry) {
  const blob = await fetchImageBlob(url);
  return new Uint8Array(await blob.arrayBuffer());
}

function zipFiles(files: AsyncZippable) {
  return new Promise<Uint8Array>((resolve, reject) => {
    zip(files, { level: STORE_LEVEL }, (error, archive) =>
      error ? reject(error) : resolve(archive),
    );
  });
}

export async function buildCollectionZip(entries: ArchiveEntry[]) {
  const contents = await Promise.all(entries.map(fetchEntryBytes));
  const files: AsyncZippable = Object.fromEntries(
    entries.map((entry, index) => [entry.path, contents[index]]),
  );
  const archive = await zipFiles(files);
  return new Blob([archive.slice()], { type: ZIP_MIME_TYPE });
}
