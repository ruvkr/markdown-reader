import { v4 as uuid } from 'uuid';
import { Markdown, ImageDoc } from '../..';

export function createMarkdown(data: {
  name: string;
  fileID: string;
  htmlID: string;
  imageList: ImageDoc[];
}): Markdown {
  return {
    _id: uuid(),
    name: data.name,
    created: new Date().toJSON(),
    imageList: data.imageList,
    hasMissingImages: data.imageList.some(i => i.type === 'missing'),
    progress: 0,
    attachmentsMap: {
      file: data.fileID,
      html: data.htmlID,
    },
  };
}
