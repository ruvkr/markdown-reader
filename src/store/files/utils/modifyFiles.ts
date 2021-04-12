import { Markdown } from '../types';

type Modifier = (file: Markdown) => Markdown;

export function modifyFiles(files: Markdown, modifier: Modifier): Markdown;
export function modifyFiles(files: Markdown[], modifier: Modifier): Markdown[];
export function modifyFiles(
  files: Markdown | Markdown[],
  modifier: Modifier
): Markdown | Markdown[] {
  if (Array.isArray(files)) return files.map(modifyFactory(modifier));
  else return modifyFactory(modifier)(files);
}

function modifyFactory(modifier: Modifier): (file: Markdown) => Markdown {
  return function (file: Markdown) {
    const modifiedFile = modifier(file);
    modifiedFile.modified = new Date().toJSON();
    return modifiedFile;
  };
}
