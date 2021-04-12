import { get, set } from '../useConfigsStore';
import {
  FileGridConfigs,
  FileActionConfigs,
  ReaderConfigs,
  AppConfigs,
} from '../types';

export const configsActions = {
  updatefgc,
  updatefac,
  updaterc,
  updateac,
};

function updatefgc(configs: Partial<FileGridConfigs>): void {
  const oldConfigs = get().fgc;
  const newConfigs = { ...oldConfigs, ...configs };
  set({ fgc: newConfigs });
}

function updatefac(configs: Partial<FileActionConfigs>): void {
  const oldConfigs = get().fac;
  const newConfigs = { ...oldConfigs, ...configs };
  set({ fac: newConfigs });
}

function updaterc(configs: Partial<ReaderConfigs>): void {
  const oldConfigs = get().rc;
  const newConfigs = { ...oldConfigs, ...configs };
  set({ rc: newConfigs });
}

function updateac(configs: Partial<AppConfigs>): void {
  const oldConfigs = get().ac;
  const newConfigs = { ...oldConfigs, ...configs };
  set({ ac: newConfigs });
}
