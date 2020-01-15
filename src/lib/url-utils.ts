import { FilenameWithExt } from './types';

export function getFilenameExtFromUrl(url: string): FilenameWithExt {
  const re = /[^/\\&?]+\.\w{3,4}(?=([?&].*$|$))/i;
  const match = Array.from(re.exec(url) || []);
  if (match.length > 0) {
    const filename = match[0];
    const extDotIndex = filename.lastIndexOf('.');
    return {
      filename: filename.substring(0, extDotIndex),
      ext: filename.substring(extDotIndex + 1),
    };
  } else {
    return {};
  }
}

export function isImageUrl(url: string): boolean {
  return new RegExp(/.*\.(jpg|jpeg|png|gif|webp)/i).test(url);
}

// adds missing protocol to URL
export function normalizeUrl(url: string): string {
  return url.match(/^[a-zA-Z]+:\/\//) ? url : `${window.location.protocol}${url}`;
}
