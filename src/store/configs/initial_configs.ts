import { FileGridConfigs, FileActionConfigs, ReaderConfigs, AppConfigs } from './types';
import { themes } from '../../assets/themes';

export const initialac: AppConfigs = {
  theme: themes[0],
  font: { name: 'Source Sans Pro', weights: [400, 700] },
  fontSize: 16,
};

export const initialfgc: FileGridConfigs = {
  listMode: false,
  sortBy: 'name',
  sortOrder: 'ascending',
  groupBy: 'none',
  groupOrder: 'ascending',
};

export const initialfac: FileActionConfigs = {
  autoConfirmDelete: false,
  autoConfirmManageImages: false,
};

export const initialrc: ReaderConfigs = {
  codeTheme: 'Gruvbox Dark',
  docTheme: 'Default',
  font: { name: 'Source Sans Pro', weights: [400, 700] },
  codeFont: { name: 'Ubuntu Mono', weights: [400, 700] },
  serifFont: { name: 'Vollkorn', weights: [400, 700] },
  fontSize: 16,
  codeFontSize: 16,
  highlightStyle: {
    backgroundColor: 'rgb(240, 240, 48)',
    color: 'rgb(34, 40, 49)',
  },
};
