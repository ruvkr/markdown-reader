import { useConfigsStore } from '../configs';
import { useFileStore } from './';
import { errorActions } from '../error/actions';
import { crud } from './actions';
import { updateLists } from './actions/various';
import { sort } from './actions/sort';
import { StoreInit } from '../types';

export const initFilesStore: StoreInit = async () => {
  try {
    const unsubSort = useConfigsStore.subscribe(sort, s => s.fgc);
    const unsubList = useFileStore.subscribe(updateLists, s => s.files);
    await crud.refetch();

    return () => {
      unsubSort();
      unsubList();
    };
  } catch (error) {
    console.error(error);
    errorActions.add({
      title: 'Files initialization error',
      message: 'Error initializing files store',
    });
  }
};
