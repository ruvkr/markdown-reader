import { useConfigsStore } from '.';
import { initialSync, syncConfigs } from './actions/sync';
import { errorActions } from '../error/actions';
import { StoreInit } from '../types';

export const initConfigsStore: StoreInit = async () => {
  try {
    await initialSync();
    return useConfigsStore.subscribe(syncConfigs);
  } catch (error) {
    console.error(error);
    errorActions.add({
      title: 'Configs initialization error',
      message: 'Error initializing configs store',
    });
  }
};
