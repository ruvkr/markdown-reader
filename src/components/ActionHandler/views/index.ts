import { ActionTypes } from '../../../store/alert';
import { HandlerFunction } from '../types';

import { deleteHandler } from './deleteHandler';
import { manageImagesHandler } from './manageImagesHandler ';
import { detailsHandler } from './detailsHandler';
import { renameHandler } from './renameHandler';
import { collectionHandler } from './collectionHandler';
import { removeImageHandler } from './removeImage';
import { replaceImageHandler } from './replaceImageHandler';

export const handlers: { [K in ActionTypes]: HandlerFunction<K> } = {
  delete: deleteHandler,
  manageImages: manageImagesHandler,
  addToCollection: collectionHandler,
  details: detailsHandler,
  removeImage: removeImageHandler,
  rename: renameHandler,
  replaceImages: replaceImageHandler,
};
