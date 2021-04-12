import {
  ImageIdMap,
  ImageSourceMap,
  AttachmentsSourceMap,
  AttachmentsMap,
  MarkdownsObjMap,
} from '../';

export const others = {
  sourceImages,
  revokeSources,
  compareAttch,
  compareMds,
};

function sourceImages(
  idMap: ImageIdMap,
  attchSources: AttachmentsSourceMap
): ImageSourceMap {
  const imageSources: ImageSourceMap = {};
  for (const id in idMap)
    if (idMap[id] in attchSources) imageSources[id] = attchSources[idMap[id]];
  return imageSources;
}

function compareAttch(
  currentAttchMap: AttachmentsMap,
  prevAttchMap: AttachmentsMap
): {
  toAdd: AttachmentsMap;
  toDelete: AttachmentsMap;
} {
  const toAdd: AttachmentsMap = { ...currentAttchMap };
  const toDelete: AttachmentsMap = { ...prevAttchMap };

  for (const id in toAdd) {
    if (id in toDelete) {
      delete toAdd[id];
      delete toDelete[id];
    }
  }

  return { toAdd, toDelete };
}

function compareMds(
  currentFilesMap: MarkdownsObjMap,
  prevFilesMap: MarkdownsObjMap
): MarkdownsObjMap {
  const changedFilesMap: MarkdownsObjMap = {};
  for (const fileID in currentFilesMap) {
    const { attachmentsMap: am, imageList: il } = currentFilesMap[fileID];
    const { attachmentsMap: oam, imageList: oil } = prevFilesMap[fileID];
    const changed =
      Object.keys(am).some(k => am[k] !== oam[k]) ||
      Object.keys(il).some(k => il[k].type !== oil[k].type);
    if (changed) changedFilesMap[fileID] = currentFilesMap[fileID];
  }

  return changedFilesMap;
}

function revokeSources(attchSources: AttachmentsSourceMap) {
  for (const id in attchSources) URL.revokeObjectURL(attchSources[id]);
}
