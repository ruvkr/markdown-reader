import { Markdown } from '../files';

export type ReadDocInfo = { file: Markdown; highlight?: string };

export type ImageSourceMap = { [imageID: string]: string };

export type ImageIdMap = { [imageID: string]: string };
