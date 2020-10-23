import { getImageWrapperLink, getLargestImage, getSiblingLinkInTree } from './lib/img-utils';

(() => {
  // first check if we now show the image and so we can go back to original page
  const bodyChildren = document.body.children;
  if (bodyChildren.length > 0 && bodyChildren[0].tagName.toLowerCase() === 'img') {
    window.history.back();
    return;
  }

  // get largest image in the page
  const largestImage = getLargestImage(document);

  if (largestImage) {
    // check if the image is wrapped in a link which points to an image
    const imageWrapperLink = getImageWrapperLink(largestImage);
    // check DOM tree starting up to N levels above if it contains any link to an image with similar filename
    const siblingLink = getSiblingLinkInTree(largestImage, 2);

    chrome.runtime.sendMessage({
      type: 'openImage',
      src: imageWrapperLink || siblingLink || largestImage.src,
    });
  }
})();
