import { FontInfo } from '../types';
import { Font } from '../../configs';

export function getFonts(info: FontInfo[]): Font[] {
  return info.reduce<Font[]>((acc, cur) => {
    const weights: number[] = [];
    if (cur.variants.includes('regular')) weights.push(400);
    if (cur.variants.includes('700')) weights.push(700);
    if (weights.length === 0) return acc;
    acc.push({ name: cur.family, weights, category: cur.category });
    return acc;
  }, []);
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
