import { Markdown } from '../types';
import moment from 'moment';

type SortBy = 'name' | 'created' | 'modified' | 'progress' | 'lastOpened';
type SortOrder = 'ascending' | 'descending';

export function sortMarkdowns(
  markdowns: Markdown[],
  sortBy: SortBy,
  order: SortOrder
) {
  const array = [...markdowns];
  array.sort(compareBy(sortBy, order === 'descending'));
  return array;
}

export function compareBy(sortBy: SortBy, descending: boolean = false) {
  const multiplier = descending ? -1 : 1;
  const modifier =
    sortBy === 'created' || sortBy === 'modified' || sortBy === 'lastOpened'
      ? (value: string | number) => moment(value).unix()
      : (value: string | number) => value;
  return function (a: Markdown, b: Markdown): number {
    const val1 = modifier(a[sortBy] ?? 0);
    const val2 = modifier(b[sortBy] ?? 0);
    if (val1 < val2) return -1 * multiplier;
    else if (val1 > val2) return 1 * multiplier;
    else return 0;
  };
}
