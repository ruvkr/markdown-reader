import { Markdown } from '../types';
import { set } from '../useFileStore';
import { errorActions } from '../../error/actions';
import { notificationAlert } from '../../alert';
import { filesdb, attachdb } from '../../../database';
import { createNewFiles, markdownList } from '../utils';

let allFiles: Markdown[] | null = null;

export const crud = {
  add: addNewFiles,
  refetch: refetchAllFiles,
  refetchOne,
  update: updateFiles,
  delete: deleteFiles,
};

async function addNewFiles(files: File[]) {
  // filter only .md files
  files = files.filter(file => /\.md$/i.test(file.name));

  if (files.length === 0) {
    errorActions.add({
      title: 'Invalid files',
      message: 'No markdown files were selected. Try again.',
    });
    return;
  }

  // wait notif
  const waitId = notificationAlert.create('wait', 'Loading files');

  try {
    // new mds and attachments
    const { attachments, markdowns } = await createNewFiles(files);

    // storing in db
    const { error: attchError } = await attachdb.addAll(attachments);
    if (attchError.length > 0) console.error(attchError);
    const { ok: newFiles, error: fileError } = await filesdb.addAll(markdowns);
    if (fileError.length > 0) console.error(fileError);

    // adding new files to store
    allFiles = markdownList({ allFiles, newFiles });
    set({ files: allFiles });

    // finish it
    if (!waitId) return;
    notificationAlert.update(waitId, 'success', 'Files added', 1000);
  } catch (error) {
    notificationAlert.clear(waitId);
    console.error(error);
    errorActions.add({
      title: 'Database error',
      message: 'There was an error storing files to database.',
    });
  }
}

async function refetchAllFiles() {
  try {
    const filesinDB = await filesdb.getAll();

    // sorting
    allFiles = markdownList({ allFiles: filesinDB });
    set({ files: allFiles });
  } catch (error) {
    console.error(error);
    errorActions.add({
      title: 'Database error',
      message: 'There was an error while fetching files.',
    });
  }
}

async function refetchOne(id: string) {
  try {
    const getResult = await filesdb.getOne(id);
    if ('error' in getResult) throw getResult.error;

    // update and sort
    allFiles = markdownList({ allFiles, updatedFiles: [getResult.ok] });
    set({ files: allFiles });
  } catch (error) {
    console.error(error);
    errorActions.add({
      title: 'Database error',
      message: 'There was an error while fetching files.',
    });
  }
}

async function updateFiles(files: Markdown[]) {
  try {
    // update files in db
    const { ok, error } = await filesdb.updateMany(files);
    if (error.length > 0) console.error(error);

    // update files in store
    allFiles = markdownList({ allFiles, updatedFiles: ok });
    set({ files: allFiles });
  } catch (error) {
    console.error(error);
    errorActions.add({
      title: 'Database error',
      message: 'There was an error while updating files.',
    });
  }
}

async function deleteFiles(files: Markdown[]) {
  try {
    // map ids
    const attch_ids: string[] = [];
    const file_ids: string[] = [];
    for (const file of files) {
      attch_ids.push(...Object.values(file.attachmentsMap));
      file_ids.push(file._id);
    }

    // delete files in database
    const { error: attchError } = await attachdb.deleteMany(attch_ids);
    if (attchError.length > 0) console.error(attchError);
    const { error: fileError } = await filesdb.deleteMany(file_ids);
    if (fileError.length > 0) console.error(fileError);

    // delete files in store
    allFiles = markdownList({ allFiles, deletedFiles: files });
    set({ files: allFiles });
  } catch (error) {
    console.error(error);
    errorActions.add({
      title: 'Database error',
      message: 'There was an error while deleting files.',
    });
  }
}
