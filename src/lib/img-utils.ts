import { Maybe } from './types';
import { getFilenameExtFromUrl, isImageUrl, normalizeUrl } from './url-utils';

export function getLargestImage(root: Document | Element): Maybe<HTMLImageElement> {
  const imgEls = root.getElementsByTagName('img');
  const images = Array.from(imgEls);
  let maxDimension = 0;
  let maxImage: Maybe<HTMLImageElement> = undefined;

  images.forEach((img) => {
    const dimension = img.width * img.height;
    if (dimension > maxDimension) {
      maxDimension = dimension;
      maxImage = img;
    }
  });

  return maxImage;
}

export function getImageWrapperLink(image: HTMLImageElement): Maybe<string> {
  const link = image.closest('a');

  if (link) {
    const url = link.getAttribute('href');
    const isImage = url && isImageUrl(url);

    if (isImage) {
      return url;
    }
  }

  return undefined;
}

export function getSiblingLinkInTree(image: HTMLImageElement, levels = 1): Maybe<string> {
  const imgSrc = image.getAttribute('src');

  if (!imgSrc) {
    return;
  }

  const imgFilename = getFilenameExtFromUrl(imgSrc).filename;

  if (!imgFilename) {
    return;
  }

  let parent = image.parentElement;

  for (let i = 0; i <= levels; i++) {
    if (!parent) {
      return;
    }

    const links = parent.querySelectorAll('a[href]');
    const matches: string[] = [];

    links.forEach((link) => {
      const linkUrl = link.getAttribute('href');
      if (linkUrl) {
        const linkFilename = getFilenameExtFromUrl(linkUrl).filename;

        if (linkFilename && linkFilename.includes(imgFilename)) {
          matches.push(normalizeUrl(linkUrl));
        }
      }
    });

    // if there are matches, prefer the one containing 'orig' otherwise return first
    if (matches.length) {
      const matchesWithOrig = matches.filter((m) => m.includes('orig'));
      return matchesWithOrig.length ? matchesWithOrig[0] : matches[0];
    }

    parent = parent.parentElement;
  }
}
