import { IMAGE_FETCH_FAILED, PNG_MIME_TYPE } from '@/constants/upload';

export async function fetchImageBlob(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(IMAGE_FETCH_FAILED);
  }
  const blob = await response.blob();
  return blob.type === PNG_MIME_TYPE
    ? blob
    : new Blob([blob], { type: PNG_MIME_TYPE });
}

export function copyPngToClipboard(url: string) {
  const item = new ClipboardItem({ [PNG_MIME_TYPE]: fetchImageBlob(url) });
  return navigator.clipboard.write([item]);
}

export async function downloadImage(url: string, filename: string) {
  const objectUrl = URL.createObjectURL(await fetchImageBlob(url));
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(objectUrl);
}
