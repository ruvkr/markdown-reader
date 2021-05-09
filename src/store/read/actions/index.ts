import { get, set } from '../useReadStore';
import { Highlights, Markdown } from '../../files';
import { attachdb, filesdb } from '../../../database';
import { readText, modifyFiles, createAttachment } from '../../files/utils';
import { errorActions } from '../../error';
import { crud } from '../../files';
import { sourceImages, revokeSources, attachImages } from '../utils';
import { ReadDocInfo } from '../types';

let imageSources: { [imageID: string]: string } = {};

export const readActions = {
  read: readDoc,
  loadHtml,
  dismiss: dismissRead,
  updateProgress,
  updateHighlights,
  updateHtml,
};

function readDoc(file: Markdown, highlight?: string) {
  const info: ReadDocInfo = { file };
  if (highlight) info.highlight = highlight;
  set({ read: info, html: null, readProgress: file.progress ?? 0 });
}

async function loadHtml() {
  const file = get().read?.file;
  if (!file) return;

  // check if exist
  const { file: _, html, ...images } = file.attachmentsMap;
  const result = await attachdb.getOne(html);
  if ('error' in result) {
    console.error(result.error);
    errorActions.add({ title: 'Read error', message: 'Can not find html' });
    return;
  }

  // html file to text
  let htmlString = await readText(result.ok.file);

  // update html with images
  if (Object.keys(images).length > 0) {
    // get attachments
    const { ok, error } = await attachdb.getMany(Object.values(images));
    if (error.length > 0) console.error(error);

    // update html and source images
    if (ok.length > 0) {
      imageSources = sourceImages(images, ok);
      htmlString = attachImages(htmlString, images, imageSources);
    }
  }

  set({ html: htmlString });

  // update lastOpened prop in file in db
  const updatedFile: Markdown = { ...file, lastOpened: new Date().toJSON() };
  const response = await filesdb.updateOne(updatedFile);
  if ('error' in response) console.error(response.error);
}

async function dismissRead() {
  const file = get().read?.file;
  revokeSources(imageSources);
  imageSources = {};
  set({ read: null });

  // refetch to reflect changes
  if (!file) return;
  crud.refetchOne(file._id);
}

async function updateProgress(progress: number) {
  const file = get().read?.file;
  if (!file || isNaN(progress)) return;
  if (progress > 1) progress = 1;
  if (progress < 0) progress = 0;
  const scroll = progress;

  try {
    // get progress value from db
    const result = await filesdb.getOne(file._id);
    if ('error' in result) throw result.error;
    let prevProgress = result.ok.progress ?? 0;

    // update latest values
    if (progress < prevProgress) progress = prevProgress;
    const updated = modifyFiles(result.ok, f => ({ ...f, progress, scroll }));
    set({ readProgress: progress });

    // update file in db
    // there is _rev from prev get
    const response = await filesdb.addOne(updated);
    if ('error' in response) throw response.error;
  } catch (error) {
    console.error(error);
    errorActions.add({
      title: 'Database error',
      message: 'There was an error with files database.',
    });
  }
}

async function updateHighlights(highlights: Highlights) {
  try {
    const file = get().read?.file;
    if (!file) return;

    // get latest file form db
    const result = await filesdb.getOne(file._id);
    if ('error' in result) throw result.error;

    // update latest values
    const updated = modifyFiles(result.ok, f => ({ ...f, highlights }));

    // update file in db
    const response = await filesdb.addOne(updated);
    if ('error' in response) console.error(response.error);
  } catch (error) {
    console.error(error);
    errorActions.add({
      title: 'Database error',
      message: 'There was an error fetching files.',
    });
  }
}

async function updateHtml(html: string) {
  const file = get().read?.file;
  if (!file) return;

  // create updated attachment
  const htmlID = file.attachmentsMap.html;
  const htmlAttch = createAttachment(html, `html_${file.name}`, htmlID);

  // update file in db
  const response = await attachdb.updateOne(htmlAttch);
  if ('error' in response) console.error(response.error);
}
