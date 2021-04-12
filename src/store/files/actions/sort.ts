import { get, set } from '../useFileStore';
import { sortMarkdowns } from '../utils';
import { ConfigsStore } from '../../configs';

export function sort(cfg: ConfigsStore['fgc']) {
  const files = get().files;
  if (!files) return;
  const { sortBy, sortOrder } = cfg;
  const sorted = sortMarkdowns(files, sortBy, sortOrder);
  set({ files: sorted });
}
