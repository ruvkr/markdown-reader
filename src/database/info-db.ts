import PouchDB from 'pouchdb';

const DB = new PouchDB('markdown-reader-info');

export const infodb = {
  get,
  save,
};

async function get<T = any>(id: string) {
  try {
    const result = await DB.get<{ data: T }>(id);
    return result.data;
  } catch (error) {
    if (error.name === 'not_found') return null;
    else throw error;
  }
}

async function save<T = any>(id: string, data: T) {
  const result = await DB.get(id).catch(error => {
    if (error.name !== 'not_found') throw error;
  });

  return await DB.put<{ data: T }>({
    _id: id,
    _rev: result ? result._rev : undefined,
    data,
  });
}
