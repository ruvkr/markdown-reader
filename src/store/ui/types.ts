export type ViewTypes = 'home' | 'files' | 'highlights' | 'settings';

export type FontInfo = {
  category: string;
  family: string;
  files: { [key: string]: string };
  subsets: string[];
  variants: string[];
  version: string;
  lastModified?: string;
  kind?: string;
};

export type VariantInfo = {
  wght: number;
  style: string;
  italic: boolean;
};
