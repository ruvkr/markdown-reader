import { Markdown, HighlightsList } from '../types';
import { sortMarkdowns } from '../utils';
import { set } from '..';

export function updateLists(files: Markdown[] | null) {
  if (!files) {
    // reset
    set({ recentlyAdded: null, recentlyOpened: null, highlights: null });
    return;
  }

  const recentlyAdded = sortMarkdowns(
    files,
    'created',
    'descending' //
  ).slice(0, 10);

  const recentlyOpened = sortMarkdowns(
    files.filter(file => file.lastOpened),
    'lastOpened',
    'descending' //
  ).slice(0, 10);

  // all highlights
  const highlights = files.reduce<HighlightsList[]>((acc, cur) => {
    if (cur.highlights && Object.keys(cur.highlights).length > 0) {
      const highlights: { id: string; text: string; note?: string }[] = [];
      for (const id in cur.highlights)
        highlights.push({ id, ...cur.highlights[id] });
      acc.push({ file: cur, highlights });
    }
    return acc;
  }, []);

  set({
    recentlyAdded: recentlyAdded.length > 0 ? recentlyAdded : null,
    recentlyOpened: recentlyOpened.length > 0 ? recentlyOpened : null,
    highlights: highlights.length > 0 ? highlights : null,
  });
}
