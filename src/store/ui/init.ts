import { errorActions } from '../error/actions';
import { Markdown, useFileStore } from '../files';
import { StoreInit } from '../types';
import { viewActions } from './actions';

export const initUiStore: StoreInit = async () => {
  try {
    // update isEmpty value
    return useFileStore.subscribe(
      (files: Markdown[] | null) => viewActions.toggleIsEmpty(!Boolean(files)),
      s => s.files
    );
  } catch (error) {
    console.error(error);
    errorActions.add({
      title: 'Configs initialization error',
      message: 'Error initializing configs store',
    });
  }
};
