import PouchDB from 'pouchdb';
import { Attachment } from '../store/files';
import { rAttachment } from './types';
import { fromAttachment, toAttachment } from './utils/transform-attachments';

const DB = new PouchDB('markdown-reader-attachments');

export const attachdb = {
  addAll,
  addOne,
  deleteMany,
  getAll,
  getMany,
  getOne,
  updateOne,
};

async function addAll(
  files: (Attachment & { rev?: string })[]
): Promise<{
  ok: PouchDB.Core.Response[];
  error: PouchDB.Core.Error[];
}> {
  // if empty array return
  if (files.length === 0) return { ok: [], error: [] };

  // convert and store files
  const rFiles = fromAttachment(files);
  const results = await DB.bulkDocs<rAttachment>(rFiles);

  // sort response
  const ok: PouchDB.Core.Response[] = [];
  const error: PouchDB.Core.Error[] = [];
  for (const result of results) {
    if ('ok' in result) ok.push(result);
    else error.push(result);
  }

  return { ok, error };
}

async function getAll(): Promise<(Attachment & { rev: string })[]> {
  const { rows } = await DB.allDocs<rAttachment>({
    include_docs: true,
    binary: true,
  });

  // filter and map result
  const rFiles = rows.reduce<(rAttachment & PouchDB.Core.GetMeta)[]>(
    (acc, row) => {
      if (row.doc) acc.push(row.doc);
      return acc;
    },
    []
  );

  // convert and return
  return toAttachment(rFiles);
}

async function getMany(
  ids: (string | { id: string })[]
): Promise<{
  ok: (Attachment & { rev: string })[];
  error: PouchDB.Core.Error[];
}> {
  // if empty array return
  if (ids.length === 0) return { ok: [], error: [] };

  // map info and get files
  const docs = ids.map(id => (typeof id === 'string' ? { id } : id));
  const { results } = await DB.bulkGet<rAttachment>({
    docs,
    attachments: true,
    binary: true,
  });

  // sort response
  const ok: (rAttachment & PouchDB.Core.GetMeta)[] = [];
  const error: PouchDB.Core.Error[] = [];
  for (const result of results) {
    const doc = result.docs[0];
    if ('ok' in doc) ok.push(doc.ok);
    else error.push(doc.error);
  }

  // convert and return
  return { ok: toAttachment(ok), error };
}

async function getOne(
  id: string
): Promise<
  { ok: Attachment & { rev: string } } | { error: PouchDB.Core.Error }
> {
  try {
    const result = await DB.get<rAttachment>(id, {
      attachments: true,
      binary: true,
    });

    // convert and return
    return { ok: toAttachment(result) };
  } catch (error) {
    if (error.name === 'not_found') return { error };
    else throw error;
  }
}

async function addOne(
  file: Attachment & { rev?: string }
): Promise<{ ok: PouchDB.Core.Response } | { error: PouchDB.Core.Error }> {
  try {
    // convert input file
    const updatedFile = fromAttachment(file);

    // store file
    const response = await DB.put<rAttachment>(updatedFile);
    return { ok: response };
  } catch (error) {
    if (error.name === 'not_found') return { error };
    else throw error;
  }
}

async function updateOne(
  file: Attachment & { rev?: string }
): Promise<{ ok: PouchDB.Core.Response } | { error: PouchDB.Core.Error }> {
  try {
    // get latest rev and convert
    const { _rev } = await DB.get<rAttachment>(file.id);
    const updatedFile = fromAttachment({ ...file, rev: _rev });

    // update file
    const response = await DB.put<rAttachment>(updatedFile);
    return { ok: response };
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

  // map info and get files
  const docs = ids.map(id => (typeof id === 'string' ? { id } : id));
  const { results: getResults } = await DB.bulkGet<rAttachment>({ docs });

  // sort response
  const getOk: rAttachment[] = [];
  const error: PouchDB.Core.Error[] = [];
  for (const result of getResults) {
    const doc = result.docs[0];
    if ('ok' in doc) getOk.push(doc.ok);
    else error.push(doc.error);
  }

  // store updated files
  const updatedFiles = getOk.map(d => ({ ...d, _deleted: true }));
  const updateResults = await DB.bulkDocs<rAttachment>(updatedFiles);
  const updateOk: PouchDB.Core.Response[] = [];
  for (const result of updateResults) {
    if ('ok' in result) updateOk.push(result);
    else error.push(result);
  }

  return { ok: updateOk, error };
}
