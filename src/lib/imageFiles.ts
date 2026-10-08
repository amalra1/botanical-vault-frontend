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

export function downloadBlob(blob: Blob, filename: string) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(objectUrl);
}

export async function downloadImage(url: string, filename: string) {
  downloadBlob(await fetchImageBlob(url), filename);
}
