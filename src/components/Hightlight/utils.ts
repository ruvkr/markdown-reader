import * as CSS from 'csstype';
import objectToCss from 'react-style-object-to-css';
import cssToObject from 'style-to-js';

export function isin(
  a: { [key: string]: string | number },
  b: { [key: string]: string | number }
) {
  for (let k in a) if (!(k in b) || a[k] !== b[k]) return false;
  return true;
}

export function convertStyle(
  mode: 'toCss',
  styles: CSS.Properties<string>
): string;

export function convertStyle(
  mode: 'toObject',
  styles: string
): CSS.Properties<string>;

export function convertStyle(
  mode: 'toCss' | 'toObject',
  styles: CSS.Properties<string> | string
): CSS.Properties<string> | string {
  if (mode === 'toCss') return objectToCss(styles);
  else return cssToObject(styles as string);
}
