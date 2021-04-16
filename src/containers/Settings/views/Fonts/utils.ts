import { FontInfo } from '../../../../store/ui';
import { Font } from '../../../../store/configs';

export function getFont(info: FontInfo): Font | null {
  const weights: number[] = [];
  if (info.variants.includes('regular')) weights.push(400);
  if (info.variants.includes('700')) weights.push(700);
  if (weights.length === 0) return null;
  else return { name: info.family, weights };
}
