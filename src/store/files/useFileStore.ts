import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Markdown, HighlightsList } from './types';

export type FileStore = {
  files: Markdown[] | null;
  recentlyAdded: Markdown[] | null;
  recentlyOpened: Markdown[] | null;
  highlights: HighlightsList[] | null;
};

const fileStoreCreator = (): FileStore => ({
  files: null,
  recentlyAdded: null,
  recentlyOpened: null,
  highlights: null,
});

export const useFileStore = create<FileStore>(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? devtools(fileStoreCreator, 'files-store')
    : fileStoreCreator
);

export const { getState: get, setState: set } = useFileStore;
