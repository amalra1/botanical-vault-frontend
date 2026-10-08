import { useState } from 'react';
import { ZIP_EXTENSION } from '@/constants/archive';
import { copy } from '@/data/copy';
import { archiveEntries, safeFileSegment } from '@/lib/archivePaths';
import { buildCollectionZip } from '@/lib/collectionArchive';
import { downloadBlob } from '@/lib/imageFiles';
import { collectionService } from '@/services/collectionService';
import type { Collection, CollectionDownload } from '@/types/collection';
import { useSnackbar } from './useSnackbar';

export function useCollectionDownload({
  id,
  name,
}: Collection): CollectionDownload {
  const { notify } = useSnackbar();
  const [isDownloading, setIsDownloading] = useState(false);

  const download = async () => {
    setIsDownloading(true);
    try {
      const images = await collectionService.getImages(id);
      const archive = await buildCollectionZip(archiveEntries(images));
      downloadBlob(archive, `${safeFileSegment(name)}${ZIP_EXTENSION}`);
    } catch {
      notify(copy.snackbar.collectionDownloadError);
    } finally {
      setIsDownloading(false);
    }
  };

  return { isDownloading, download };
}
