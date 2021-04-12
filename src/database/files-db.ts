import PouchDB from 'pouchdb';
import { Markdown } from '../store/files/types';

const DB = new PouchDB('markdown-reader-files');

export const filesdb = {
  addAll,
  addOne,
  deleteMany,
  getAll,
  getMany,
  getOne,
  updateMany,
  updateOne,
};

async function addAll(
  files: Markdown[]
): Promise<{
  ok: (Markdown & PouchDB.Core.GetMeta)[];
  error: PouchDB.Core.Error[];
}> {
  // if empty array return
  if (files.length === 0) return { ok: [], error: [] };

  // add files
  const results = await DB.bulkDocs<Markdown>(files);

  // create revsMap and sort errors
  const revsMap: { [_id: string]: string } = {};
  const error: PouchDB.Core.Error[] = [];
  for (const result of results) {
    if ('ok' in result) revsMap[result.id] = result.rev;
    else error.push(result);
  }

  // same as await DB.bulkGet result
  const newFiles: (Markdown & PouchDB.Core.GetMeta)[] = [];
  for (const file of files) {
    if (file._id in revsMap) {
      newFiles.push({
        ...file,
        _rev: revsMap[file._id],
      });
    }
  }

  return { ok: newFiles, error };
}

async function updateMany(
  files: Markdown[]
): Promise<{
  ok: (Markdown & PouchDB.Core.GetMeta)[];
  error: PouchDB.Core.Error[];
}> {
  // if empty array return
  if (files.length === 0) return { ok: [], error: [] };

  // get latest files for latest revs
  const docs = files.map(file => ({ id: file._id }));
  const { results } = await DB.bulkGet<Markdown>({ docs });

  // create revsMap and sort errors
  const revsMap: { [_id: string]: string } = {};
  const error: PouchDB.Core.Error[] = [];
  for (const result of results) {
    const doc = result.docs[0];
    if ('ok' in doc) revsMap[result.id] = doc.ok._rev;
    else error.push(doc.error);
  }

  // filter and update revs
  const updatedFiles: (Markdown & PouchDB.Core.GetMeta)[] = [];
  for (const file of files) {
    if (file._id in revsMap) {
      updatedFiles.push({
        ...file,
        _rev: revsMap[file._id],
        modified: new Date().toJSON(),
      });
    }
  }

  // store updated files
  const result = await addAll(updatedFiles);
  return { ok: result.ok, error: error.concat(result.error) };
}

async function getAll(): Promise<(Markdown & PouchDB.Core.GetMeta)[]> {
  const { rows } = await DB.allDocs<Markdown>({ include_docs: true });

  // filter and map results
  return rows.reduce<(Markdown & PouchDB.Core.GetMeta)[]>((acc, row) => {
    if (row.doc) acc.push(row.doc);
    return acc;
  }, []);
}

async function getMany(
  ids: (string | { id: string })[]
): Promise<{
  ok: (Markdown & PouchDB.Core.GetMeta)[];
  error: PouchDB.Core.Error[];
}> {
  if (ids.length === 0) return { ok: [], error: [] };
  const docs = ids.map(id => (typeof id === 'string' ? { id } : id));
  const { results } = await DB.bulkGet<Markdown>({ docs });

  // sort results
  const ok: (Markdown & PouchDB.Core.GetMeta)[] = [];
  const error: PouchDB.Core.Error[] = [];
  for (const result of results) {
    const doc = result.docs[0];
    if ('ok' in doc) ok.push(doc.ok);
    else error.push(doc.error);
  }

  return { ok, error };
}

async function getOne(
  id: string
): Promise<
  { ok: Markdown & PouchDB.Core.GetMeta } | { error: PouchDB.Core.Error }
> {
  try {
    const result = await DB.get<Markdown>(id);
    return { ok: result };
  } catch (error) {
    if (error.name === 'not_found') return { error };
    else throw error;
  }
}

async function addOne(
  file: Markdown
): Promise<
  { ok: Markdown & PouchDB.Core.GetMeta } | { error: PouchDB.Core.Error }
> {
  try {
    await DB.put<Markdown>(file);
    const result = await DB.get<Markdown>(file._id);
    return { ok: result };
  } catch (error) {
    if (error.name === 'not_found') return { error };
    else throw error;
  }
}

async function updateOne(
  file: Markdown
): Promise<
  { ok: Markdown & PouchDB.Core.GetMeta } | { error: PouchDB.Core.Error }
> {
  try {
    // fetch and update latest rev
    const { _rev } = await DB.get<Markdown>(file._id);
    const updatedFile: Markdown = {
      ...file,
      _rev,
      modified: new Date().toJSON(),
    };

    // update latest rev
    const { rev } = await DB.put<Markdown>(updatedFile);
    const latest: Markdown & PouchDB.Core.GetMeta = { ...file, _rev: rev };
    return { ok: latest };
  } catch (error) {
    if (error.name === 'not_found') return { error };
    else throw error;
  }
}

async function deleteMany(
  ids: (string | { id: string })[]
): Promise<{
  ok: PouchDB.Core.Response[];
  error: PouchDB.Core.Error[];
}> {
  // if empty array return
  if (ids.length === 0) return { ok: [], error: [] };

  // get files with latest rev
  const result = await getMany(ids);

  // update files
  const updatedFiles = result.ok.map(file => ({ ...file, _deleted: true }));
  const responses = await DB.bulkDocs<Markdown>(updatedFiles);

  // sort response
  const ok: PouchDB.Core.Response[] = [];
  const error: PouchDB.Core.Error[] = [];
  for (const res of responses) {
    if ('ok' in res) ok.push(res);
    else error.push(res);
  }

  return { ok, error: result.error.concat(error) };
}
