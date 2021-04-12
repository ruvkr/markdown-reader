import { Markdown } from '..';
import { sortMarkdowns } from './';
import { get as getConfigs } from '../../configs';

export function markdownList(info: {
  allFiles: Markdown[] | null;
  newFiles?: Markdown[];
  updatedFiles?: Markdown[];
  deletedFiles?: Markdown[];
}): Markdown[] | null {
  let { allFiles, newFiles, updatedFiles, deletedFiles } = info;
  const { sortBy, sortOrder } = getConfigs().fgc;

  // initialize allFiles
  if (!allFiles) allFiles = [];

  // merge newFiles
  if (newFiles && newFiles.length > 0) allFiles = allFiles.concat(newFiles);

  // replace updated files
  if (updatedFiles && updatedFiles.length > 0) {
    const maps = updatedFiles.reduce<{ [id: string]: Markdown }>((acc, cur) => {
      acc[cur._id] = cur;
      return acc;
    }, {});

    for (let i = 0; i < allFiles.length; i++) {
      const fileID = allFiles[i]._id;
      if (fileID in maps) allFiles[i] = maps[fileID];
    }
  }

  // filter deleted files
  if (deletedFiles && deletedFiles.length > 0) {
    const ids = deletedFiles.map(m => m._id);
    allFiles = allFiles.filter(m => !ids.includes(m._id));
  }

  // sort files
  const sorted = sortMarkdowns(allFiles, sortBy, sortOrder);
  return sorted.length > 0 ? sorted : null;
}
