import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { ViewTypes } from './types';
import { Markdown } from '../files';
import { Font } from '../configs';

export type UiStore = {
  loading: boolean;
  view: ViewTypes | null;
  prevView: ViewTypes | null;
  prevPath: string | null;
  selectionMode: boolean;
  longPressedFile: Markdown | null;
  showMoreControls: boolean;
  expandFileControls: boolean;
  selectedFiles: { [fileID: string]: Markdown };
  fullScreen: boolean;
  isEmpty: boolean;
  allFonts: Font[] | null;
};

const uiStoreCreator = (): UiStore => ({
  loading: true,
  view: null,
  prevView: null,
  prevPath: null,
  selectionMode: false,
  longPressedFile: null,
  showMoreControls: false,
  expandFileControls: false,
  selectedFiles: {},
  fullScreen: false,
  isEmpty: true,
  allFonts: null,
});

export const useUiStore = create<UiStore>(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? devtools(uiStoreCreator, 'ui-store')
    : uiStoreCreator
);

export const { getState: get, setState: set } = useUiStore;
