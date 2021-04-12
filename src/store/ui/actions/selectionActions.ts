import { get, set } from '../useUiStore';
import { Markdown } from '../../files';

export const selectionActions = {
  toggle,
  toggleShowMore,
  toggleExpand,
  longpress,
  select,
  dismiss,
};

function toggle() {
  const prev = get().selectionMode;
  set({ selectionMode: !prev, selectedFiles: {} });
}

function toggleShowMore() {
  const prev = get().showMoreControls;
  set({ showMoreControls: !prev });
}

function toggleExpand() {
  const prev = get().expandFileControls;
  set({ expandFileControls: !prev });
}

function longpress(file: Markdown) {
  set({ longPressedFile: file });
}

function select(file: Markdown) {
  const selectedFiles = { ...get().selectedFiles };
  if (file._id in selectedFiles) delete selectedFiles[file._id];
  else selectedFiles[file._id] = file;
  set({ selectedFiles });
}

function dismiss() {
  set({
    longPressedFile: null,
    selectionMode: false,
    selectedFiles: {},
    expandFileControls: false,
    showMoreControls: false,
  });
}

