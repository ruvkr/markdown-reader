import { Markdown, ImageDoc } from '../files';

export type ManageImagesInfo = { id: string; files: Markdown[] };

export type ReducedNameList = {
  [imageName: string]: { [imageID: string]: string };
};

export type ImageIdMap = { [imageID: string]: string };

export type AttachmentsMap = { [attchID: string]: File };

export type ImageConflict = {
  id: string;
  doc: ImageDoc;
  file: MarkdownObj;
  fileID: string;
  source: string;
  newFile: File;
};

export type ImageConflictsMap = { [imageID: string]: ImageConflict };

export type ImageSourceMap = { [imageID: string]: string };

export type AttachmentsSourceMap = { [fileID: string]: string };

export type ImageListMap = { [imageID: string]: ImageDoc };

export type MarkdownObj = Omit<Markdown, 'imageList'> & {
  imageList: ImageListMap;
};

export type MarkdownsObjMap = { [fileID: string]: MarkdownObj };
