export const attachImages = (
  html: string,
  idMap: { [imageID: string]: string },
  sources: { [imageID: string]: string }
): string => {
  const parser = new DOMParser();
  const body = parser.parseFromString(html, 'text/html').body;

  for (const id in idMap) {
    const selector = `img[data-imageid="${id}"]`;
    const imageNode = body.querySelector<HTMLImageElement>(selector);
    if (imageNode) imageNode.src = sources[id];
  }

  return body.innerHTML;
};
