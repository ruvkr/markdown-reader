import { ImageDoc, Markdown } from '../files';
import { ImageConflictsMap } from '../image-manager';

export type Actions = {
  delete: {
    create: { files: Markdown[] };
    confirm: { neverAsk: boolean };
  };

  rename: {
    create: { file: Markdown };
    confirm: { newName: string };
  };

  details: {
    create: { files: Markdown[] };
    confirm: never;
  };

  manageImages: {
    create: { files: Markdown[] };
    confirm: { neverAsk: boolean };
  };

  addToCollection: {
    create: { files: Markdown[]; allCollections: string[] };
    confirm: { collectionNames: string[] };
  };

  removeImage: {
    create: { info: ImageDoc };
    confirm: { neverAsk: boolean };
  };

  replaceImages: {
    create: { conflicts: ImageConflictsMap };
    confirm: { resolved: ImageConflictsMap };
  };
};

export type ActionTypes = keyof Actions;

export type ActionInfo<T extends ActionTypes> = T extends ActionTypes
  ? Actions[T]
  : never;

export type ActionCreateInfo<T extends ActionTypes> = T extends ActionTypes
  ? { id: string; type: T } & ActionInfo<T>['create']
  : never;

export type ActionConfirmInfo<T extends ActionTypes> = T extends ActionTypes
  ? { id: string } & ActionInfo<T>['confirm']
  : never;

export type Notification = {
  type: 'info' | 'success' | 'wait' | 'error';
  id: string;
  message: string;
};
