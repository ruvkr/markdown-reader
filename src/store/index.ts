import { modifyHistory } from './history';
import { initConfigsStore } from './configs/init';
import { initFilesStore } from './files/init';
import { initUiStore } from './ui/init';

export const initializeStore = async () => {
  modifyHistory();
  const unsubUi = initUiStore();
  const unsubConfigs = await initConfigsStore();
  const unsubFiles = await initFilesStore();

  return () => {
    if (typeof unsubUi === 'function') unsubUi();
    if (typeof unsubConfigs === 'function') unsubConfigs();
    if (typeof unsubFiles === 'function') unsubFiles();
  };
};
