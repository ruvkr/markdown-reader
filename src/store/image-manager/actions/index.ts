import { v4 as uuid } from 'uuid';
import { cloneDeep } from 'lodash';
import { set, get } from '../useImageManagerStore';
import { Markdown, crud, ImageDoc } from '../../files';
import { actionAlert, notificationAlert } from '../../alert';
import { attachdb } from '../../../database';
import { maps, others } from '../utils';
import { errorActions } from '../../error';
import {
  ReducedNameList,
  AttachmentsMap,
  ImageIdMap,
  AttachmentsSourceMap,
  MarkdownsObjMap,
  ImageConflict,
  MarkdownObj,
} from '../types';

let reducedList: ReducedNameList = {};
let idMap: ImageIdMap = {};
let filesMap: MarkdownsObjMap = {};
let filesMapOriginal: MarkdownsObjMap = {};
let attchMap: AttachmentsMap = {};
let attchSourceMap: AttachmentsSourceMap = {};
let prevAttchMap: AttachmentsMap = {};

export const imActions = {
  manage,
  dismiss,
  loadSources,
  addMany: addManyImages,
  addOne: addOneImage,
  delete: deleteImage,
  save: saveChanges,
};

function manage(files: Markdown[]) {
  // remove files without images
  const haveImages = files.filter(file => file.imageList.length > 0);

  // notify if no files with images
  if (haveImages.length === 0) {
    const message = `File${files.length > 1 ? 's' : ''} have no images`;
    notificationAlert.create('info', message, 1000);
  } else set({ manage: haveImages, files: null, sources: null });
}

async function loadSources() {
  const files = get().manage;
  if (!files) return;

  // update maps
  idMap = maps.idMap(files);
  filesMap = maps.filesMap(files);
  filesMapOriginal = cloneDeep(filesMap);
  reducedList = maps.reducedList(files);

  // no prev attachments
  if (Object.keys(idMap).length === 0) {
    set({ files, sources: {} });
    return;
  }

  // get prev attachments
  const prevIds = Object.values(idMap);
  const { ok, error } = await attachdb.getMany(prevIds);
  if (error.length > 0) console.error(error);

  // update maps
  for (const attch of ok) {
    attchMap[attch.id] = attch.file;
    prevAttchMap[attch.id] = attch.file;
    attchSourceMap[attch.id] = URL.createObjectURL(attch.file);
  }

  // source images
  const sources = others.sourceImages(idMap, attchSourceMap);
  set({ files, sources });
}

function dismiss(): void {
  others.revokeSources(attchSourceMap);
  reducedList = {};
  idMap = {};
  filesMap = {};
  filesMapOriginal = {};
  attchMap = {};
  attchSourceMap = {};
  prevAttchMap = {};
  set({ manage: null });
}

function addManyImages(imageFiles: File[]) {
  const conflicts: ImageConflict[] = [];
  for (const attchFile of imageFiles) {
    if (!(attchFile.name in reducedList)) continue;
    const imageIDs = reducedList[attchFile.name];
    for (const imageID in imageIDs) {
      // validate
      const file = filesMap[imageIDs[imageID]];
      if (!file) continue;
      const doc = file.imageList[imageID];
      if (!doc) continue;

      // try to add images
      const conflict = mutateTryAdd(file, doc, attchFile);
      if (conflict) conflicts.push(conflict);
    }
  }

  // update changes in store
  const files = maps.mdArray(filesMap);
  const sources = others.sourceImages(idMap, attchSourceMap);
  set({ files, sources });

  // resolve conflicts
  if (conflicts.length > 0) resolveConflict(conflicts);
}

function addOneImage(fileID: string, imageID: string, imageFile: File) {
  // check file validation
  const validFormats = ['jpg', 'png', 'gif', 'svg', 'bmp'];
  const extension = getFileExtension(imageFile.name);
  if (!validFormats.includes(extension)) {
    errorActions.add({
      title: 'Invalid file',
      message: 'Selected file is not valid image file.',
    });
    return;
  }

  // validate info
  const file = filesMap[fileID];
  if (!file) return;
  const doc = file.imageList[imageID];
  if (!doc) return;

  // try to add image
  const conflict = mutateTryAdd(file, doc, imageFile);

  // resolve conflict
  if (conflict) resolveConflict([conflict]);
  // or update changes to store
  else {
    const files = maps.mdArray(filesMap);
    const sources = others.sourceImages(idMap, attchSourceMap);
    set({ files, sources });
  }
}

async function deleteImage(fileID: string, imageID: string) {
  try {
    // validate info
    const file = filesMap[fileID];
    if (!file) return;
    const doc = file.imageList[imageID];
    if (!doc) return;

    // create delete dialog
    const info = { info: doc };
    await actionAlert.create('removeImage', info);

    // update maps and store
    if (imageID in idMap) {
      mutateDelete(file, doc);
      const files = maps.mdArray(filesMap);
      const sources = others.sourceImages(idMap, attchSourceMap);
      set({ files, sources });
    } else {
      doc.type = 'missing';
      const files = maps.mdArray(filesMap);
      set({ files });
    }
  } catch (error) {
    if (error !== 'alert_canceled') console.error(error);
  }
}

async function saveChanges() {
  // compare changes
  const { toAdd, toDelete } = others.compareAttch(attchMap, prevAttchMap);
  prevAttchMap = cloneDeep(attchMap);
  const changedFilesMap = others.compareMds(filesMap, filesMapOriginal);
  filesMapOriginal = cloneDeep(filesMap);

  // check if anything chnaged
  const unchanged =
    Object.keys(toAdd).length === 0 &&
    Object.keys(toDelete).length === 0 &&
    Object.keys(changedFilesMap).length === 0;
  if (unchanged) return;

  // updated markdowns
  const markdowns = maps.mdArray(changedFilesMap).map(md => {
    const hasMissingImages = md.imageList.some(d => d.type === 'missing');
    return { ...md, hasMissingImages };
  });

  // updated attachments
  const attchToAdd = maps.attchArray(toAdd);
  const attchToDelete = Object.keys(toDelete);

  // update files in database
  const { error: addError } = await attachdb.addAll(attchToAdd);
  if (addError.length > 0) console.error(addError);
  const { error: deleteError } = await attachdb.deleteMany(attchToDelete);
  if (deleteError.length > 0) console.error(deleteError);
  markdowns.length > 0 && (await crud.update(markdowns));

  // notify changes
  notificationAlert.create('success', 'Images saved', 1000);
}

async function resolveConflict(conflicts: ImageConflict[]) {
  try {
    // create conflict dialog
    const info = { conflicts: maps.arrayToObj(conflicts, 'id') };
    const { resolved } = await actionAlert.create('replaceImages', info);
    let changed = false;

    for (const imageID in resolved) {
      const file = filesMap[resolved[imageID].fileID];

      // validate
      if (!file) continue;
      const doc = file.imageList[imageID];
      if (!doc) continue;

      // add and delete
      const imageFile = resolved[imageID].newFile;
      if (imageID in idMap) mutateDelete(file, doc);
      mutateAdd(file, doc, imageFile);
      changed = true;
    }

    // update changes in store
    if (!changed) return;
    const files = maps.mdArray(filesMap);
    const sources = others.sourceImages(idMap, attchSourceMap);
    set({ files, sources });
  } catch (error) {
    if (error !== 'alert_canceled') console.error(error);
  }
}

function mutateTryAdd(
  fileRef: MarkdownObj,
  docRef: ImageDoc,
  imageFile: File
): ImageConflict | undefined {
  // add if missing
  if (docRef.type === 'missing') mutateAdd(fileRef, docRef, imageFile);
  // return conflict
  else {
    return {
      id: docRef.id,
      doc: docRef,
      file: fileRef,
      fileID: fileRef._id,
      newFile: imageFile,
      source:
        docRef.id in idMap
          ? attchSourceMap[idMap[docRef.id]] //
          : docRef.src,
    };
  }
}

function mutateAdd(fileRef: MarkdownObj, docRef: ImageDoc, imageFile: File) {
  const attchID = uuid();

  // update props
  docRef.type = 'added';
  fileRef.attachmentsMap[docRef.id] = attchID;

  // update maps
  attchMap[attchID] = imageFile;
  attchSourceMap[attchID] = URL.createObjectURL(imageFile);
  idMap[docRef.id] = attchID;
}

function mutateDelete(fileRef: MarkdownObj, docRef: ImageDoc) {
  const attchID = idMap[docRef.id];
  URL.revokeObjectURL(attchSourceMap[attchID]);

  // update props
  docRef.type = 'missing';

  // update maps
  delete fileRef.attachmentsMap[docRef.id];
  delete attchMap[attchID];
  delete attchSourceMap[attchID];
  delete idMap[docRef.id];
}

function getFileExtension(name: string): string {
  const index = name.lastIndexOf('.');
  return index > -1 ? name.substr(index + 1).toLowerCase() : 'unknown';
}
