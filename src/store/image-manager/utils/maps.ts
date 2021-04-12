import { cloneDeep } from 'lodash';
import { Markdown, ImageDoc, Attachment } from '../../files';
import {
  ImageIdMap,
  ReducedNameList,
  MarkdownsObjMap,
  AttachmentsMap,
} from '../';

export const maps = {
  idMap,
  reducedList,
  arrayToObj,
  filesMap,
  mdArray,
  attchArray,
};

function idMap(files: Markdown[]): ImageIdMap {
  return files.reduce<ImageIdMap>((acc, md) => {
    const { file, html, ...images } = md.attachmentsMap;
    return Object.assign(acc, images);
  }, {});
}

function reducedList(files: Markdown[]): ReducedNameList {
  return files
    .reduce<{ doc: ImageDoc; fileID: string }[]>((acc, file) => {
      const images = file.imageList.map(doc => ({ doc, fileID: file._id }));
      return acc.concat(images);
    }, [])
    .reduce<ReducedNameList>((acc, doc) => {
      if (!(doc.doc.name in acc)) acc[doc.doc.name] = {};
      acc[doc.doc.name][doc.doc.id] = doc.fileID;
      return acc;
    }, {});
}

function arrayToObj<O extends { [key: string]: any }>(
  array: O[],
  key: keyof O
): { [key: string]: O } {
  return array.reduce<{ [key: string]: O }>((acc, cur) => {
    acc[cur[key]] = cloneDeep(cur);
    return acc;
  }, {});
}

function filesMap(files: Markdown[]): MarkdownsObjMap {
  return arrayToObj(
    files.map(md => ({ ...md, imageList: arrayToObj(md.imageList, 'id') })),
    '_id'
  );
}

function mdArray(filesMap: MarkdownsObjMap): Markdown[] {
  return Object.values(filesMap).map(md => ({
    ...md,
    imageList: Object.values(md.imageList),
  }));
}

function attchArray(filesMap: AttachmentsMap): Attachment[] {
  return Object.keys(filesMap).map(id => ({ id, file: filesMap[id] }));
}
