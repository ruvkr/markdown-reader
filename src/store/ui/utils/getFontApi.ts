import { FontInfo } from '../types';

// variantsRange = 300-700
// no italics
export function getFontApi(infos: FontInfo[]): string | null {
  if (infos.length === 0) return null;

  const apiStrings = infos.map(info => {
    const wgts = info.variants
      // .map(v => variantsInfo[v])
      // .filter(v => v && !v.italic && v.wght >= 300 && v.wght <= 700) // filter italic fonts and range
      // .map(v => v.wght)
      // .sort((a, b) => a - b); // sort numerically

    // return null if no valid variants
    if (wgts.length === 0) return null;

    // join wgts
    const wgtsString = wgts.join(';');

    // replace space with + in name
    const familyName = info.family.replace(/\s/g, '+');
    return `family=${familyName}:wght@${wgtsString}`;
  });

  const filteredApis = apiStrings.filter(a => a != null);
  if (filteredApis.length === 0) return null;
  return filteredApis.join('&');
}

// const variantsInfo: { [variant: string]: VariantInfo } = {
//   '100': { wght: 100, style: 'thin', italic: false },
//   '200': { wght: 200, style: 'extra-light', italic: false },
//   '300': { wght: 300, style: 'light', italic: false },
//   'regular': { wght: 400, style: 'regular', italic: false },
//   '500': { wght: 500, style: 'medium', italic: false },
//   '600': { wght: 600, style: 'semi-bold', italic: false },
//   '700': { wght: 700, style: 'bold', italic: false },
//   '800': { wght: 800, style: 'extra-bold', italic: false },
//   '900': { wght: 900, style: 'black', italic: false },
//   '100italic': { wght: 100, style: 'thin-italic', italic: true },
//   '200italic': { wght: 200, style: 'extra-light-italic', italic: true },
//   '300italic': { wght: 300, style: 'light-italic', italic: true },
//   'italic': { wght: 400, style: 'regular-italic', italic: true },
//   '500italic': { wght: 500, style: 'medium-italic', italic: true },
//   '600italic': { wght: 600, style: 'semi-bold-italic', italic: true },
//   '700italic': { wght: 700, style: 'bold-italic', italic: true },
//   '800italic': { wght: 800, style: 'extra-bold-italic', italic: true },
//   '900italic': { wght: 900, style: 'black-italic', italic: true },
// };
