import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { ReadDocInfo } from './types';

export type ReadStore = {
  read: ReadDocInfo | null;
  html: string | null;
};

const readStoreCreator = (): ReadStore => ({
  read: null,
  html: null,
});

export const useReadStore = create<ReadStore>(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? devtools(readStoreCreator, 'read-store')
    : readStoreCreator
);

export const { getState: get, setState: set } = useReadStore;
