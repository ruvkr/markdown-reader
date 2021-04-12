import codeThemes from '../../assets/styles/codeThemes';
import docThemes from '../../assets/styles/docThemes';
import * as CSS from 'csstype';

export interface FileGridConfigs {
  listMode: boolean;
  sortBy: 'name' | 'created' | 'modified' | 'progress';
  sortOrder: 'ascending' | 'descending';
  groupBy: 'alphabet' | 'created' | 'modified' | 'progress' | 'none';
  groupOrder: 'ascending' | 'descending';
}

export interface FileActionConfigs {
  autoConfirmDelete: boolean;
  autoConfirmManageImages: boolean;
}

export interface ReaderConfigs {
  codeTheme: keyof typeof codeThemes;
  docTheme: keyof typeof docThemes;
  highlightStyle: CSS.Properties<string>;
  font: Font;
  fontSize: number;
  codeFont: Font;
  codeFontSize: number;
  serifFont: Font;
  serifFontSize: number;
}

export interface AppConfigs {
  theme: Theme;
  font: Font;
  fontSize: number;
  serifFont: Font;
  serifFontSize: number;
}

export type Configs = {
  ac: AppConfigs;
  fgc: FileGridConfigs;
  fac: FileActionConfigs;
  rc: ReaderConfigs;
};

export type Font = {
  name: string;
  weights: number[];
};

export type Theme = {
  name: string;
  colors: {
    background: string;
    popup: string;
    border: string;
    card: string;
    hover: string;
    accent: string;
    primary: string;
    secondary: string;
    disabled: string;
    interactive: string;
    error: string;
    success: string;
    info: string;
  };
};