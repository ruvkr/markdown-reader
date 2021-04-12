export type ImageDocTypes = 'absolute' | 'added' | 'embedded' | 'missing';

export type Markdown = {
  _id: string;
  _deleted?: boolean;
  _rev?: string;
  name: string;
  created: string;
  modified?: string;
  lastOpened?: string;
  collections?: string[];
  imageList: ImageDoc[];
  hasMissingImages: boolean;
  progress?: number;
  scroll?: number;
  highlights?: Highlights;
  attachmentsMap: {
    file: string;
    html: string;
    [imageID: string]: string;
  };
};

export type Highlights = {
  [highlightID: string]: {
    text: string;
    note?: string;
  };
};

export type HighlightsList = {
  file: Markdown;
  highlights: {
    id: string;
    text: string;
    note?: string;
  }[];
};

export type Attachment = {
  id: string;
  file: File;
};

export type ImageDoc = {
  id: string;
  name: string;
  type: ImageDocTypes;
  alt: string;
  src: string;
};

export type Actions = {
  delete: Markdown[];
  rename: Markdown;
  details: Markdown[];
  manageImages: Markdown[];
  addToCollection: Markdown[];
};

export type ActionTypes = keyof Actions;
