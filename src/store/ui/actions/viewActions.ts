import fscreen from 'fscreen';
import { get, set } from '../useUiStore';
import { ViewTypes } from '../types';

export const viewActions = {
  changeView,
  toggleLoading,
  toggleFs,
  toggleIsEmpty,
};

function changeView(view: ViewTypes) {
  const current = get().view;
  set({ view, prevView: current, prevPath: window.location.pathname });
}

function toggleLoading(loading?: boolean) {
  const current = loading ?? !get().loading;
  set({ loading: current });
}

function toggleFs(active?: boolean) {
  if (!fscreen.fullscreenEnabled) return;
  const current = active ?? !get().fullScreen;
  if (current) fscreen.requestFullscreen(document.body);
  else if (fscreen.fullscreenElement !== null) fscreen.exitFullscreen();
  set({ fullScreen: current });
}

function toggleIsEmpty(empty: boolean) {
  const current = get().isEmpty;
  if (empty !== current) set({ isEmpty: empty });
}

fscreen.addEventListener('fullscreenchange', () => {
  const current = get().fullScreen;
  if (!fscreen.fullscreenElement && current) set({ fullScreen: false });
});
