import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Markdown } from '../files';
import { ImageSourceMap } from './types';

export type ImageManagerStore = {
  manage: Markdown[] | null;
  sources: ImageSourceMap | null;
  files: Markdown[] | null;
};

const imageManagerStoreCreator = (): ImageManagerStore => ({
  manage: null,
  sources: {},
  files: [],
});

export const useImageManagerStore = create<ImageManagerStore>(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? devtools(imageManagerStoreCreator, 'image-manager-store')
    : imageManagerStoreCreator
);

export const { getState: get, setState: set } = useImageManagerStore;
