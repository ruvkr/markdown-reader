import create from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  FileGridConfigs,
  FileActionConfigs,
  ReaderConfigs,
  AppConfigs,
} from './types';
import {
  initialfgc,
  initialfac,
  initialrc,
  initialac,
} from './initial_configs';

export type ConfigsStore = {
  fgc: FileGridConfigs;
  fac: FileActionConfigs;
  rc: ReaderConfigs;
  ac: AppConfigs;
};

const configsStoreCreator = (): ConfigsStore => ({
  fgc: initialfgc,
  fac: initialfac,
  rc: initialrc,
  ac: initialac,
});

export const useConfigsStore = create<ConfigsStore>(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? devtools(configsStoreCreator, 'configs-store')
    : configsStoreCreator
);

export const { getState: get, setState: set } = useConfigsStore;
