const APPLE_PLATFORM = /Mac|iPhone|iPad|iPod/;

export function isApplePlatform(userAgent: string) {
  return APPLE_PLATFORM.test(userAgent);
}
