import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { ReadDocInfo } from './types';

export type ReadStore = {
  read: ReadDocInfo | null;
  html: string | null;
  readProgress: number;
};

const readStoreCreator = (): ReadStore => ({
  read: null,
  html: null,
  readProgress: 0,
});

export const useReadStore = create<ReadStore>(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? devtools(readStoreCreator, 'read-store')
    : readStoreCreator
);

export const { getState: get, setState: set } = useReadStore;
