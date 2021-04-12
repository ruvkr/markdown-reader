import { set, get, FontInfo } from '../';
import { getGoogleFontsApi } from '../../../keys';

const apikey = getGoogleFontsApi();

export const fontActions = {
  loadFontInfos,
  cleanFontInfos: () => set({ fontInfos: null }),
};

async function loadFontInfos() {
  try {
    // return if already loaded
    const { fontInfos } = get();
    if (fontInfos != null) return;

    const link = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apikey}`;
    const response = await fetch(link);
    const { items } = (await response.json()) as { items: FontInfo[] };
    set({ fontInfos: items });
    return items;
  } catch (error) {
    console.error(error);
  }
}