import { Attachment } from '../../files';

export const sourceImages = (
  idMap: { [imageID: string]: string },
  attachments: Attachment[]
) => {
  const sourceMap: { [imageID: string]: string } = {};
  const attchObj = attachments.reduce<{ [key: string]: File }>((obj, item) => {
    obj[item.id] = item.file;
    return obj;
  }, {});

  for (const id in idMap) {
    const file = attchObj[idMap[id]];
    if (file) sourceMap[id] = URL.createObjectURL(file);
  }

  return sourceMap;
};

export const revokeSources = (fileSourceMap: { [fileID: string]: string }) => {
  for (const id in fileSourceMap) URL.revokeObjectURL(fileSourceMap[id]);
};
