import { v4 as uuid } from 'uuid';
import DOMPurify from 'dompurify';
import { ImageDoc } from '../..';

const purify = DOMPurify(window);
const parser = new DOMParser();

function getImageInfo(
  imageElement: HTMLImageElement,
  imageID: string
): ImageDoc {
  const src = imageElement.getAttribute('src') ?? '';
  const alt = imageElement.getAttribute('alt') ?? '';
  const imageName = src.substr(src.lastIndexOf('/') + 1).replace(/[#?].*$/, '');
  let type: ImageDoc['type'] = 'missing';
  if (/^https?:\/\//.test(src)) type = 'absolute';
  else if (/^data:image\//.test(src)) type = 'embedded';
  return { id: imageID, name: imageName, type, src, alt };
}

export function createImageList(
  htmlString: string
): { imageList: ImageDoc[]; updatedHtml: string } {
  const cleanHtml = purify.sanitize(htmlString);
  const body = parser.parseFromString(cleanHtml, 'text/html').body;
  const imgNodes = Array.from(body.querySelectorAll('img'));

  const imageList = imgNodes.map(img => {
    const id = uuid();
    img.setAttribute('data-imageid', id);
    return getImageInfo(img, id);
  });

  return {
    imageList,
    updatedHtml: body.innerHTML,
  };
}
