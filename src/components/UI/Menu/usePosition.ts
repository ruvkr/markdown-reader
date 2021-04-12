import { useLayoutEffect, useRef } from 'react';
import { useDimensions, DimensionInfo } from '../../../hooks';

export interface PositionInfo {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  transformOriginX: 'left' | 'right';
  transformOriginY: 'top' | 'bottom';
}

export function usePosition(configs: {
  buttonRef: React.MutableRefObject<HTMLElement | null>;
  containerRef: React.MutableRefObject<HTMLElement | null>;
  callback: (info: PositionInfo | null) => void;
  margin?: number;
  gap?: number;
}) {
  const { buttonRef, containerRef, callback, margin = 16, gap = 8 } = configs;
  const buttonDimensions = useRef<DimensionInfo | null>(null);
  const containerDimensions = useRef<DimensionInfo | null>(null);
  useDimensions(buttonRef, data => (buttonDimensions.current = data));
  useDimensions(containerRef, data => (containerDimensions.current = data));

  useLayoutEffect(() => {
    if (buttonDimensions.current && containerDimensions.current) {
      const { width: bw, height: bh, x: bx, y: by } = buttonDimensions.current;
      const { width: cw, height: ch } = containerDimensions.current;
      const { innerWidth: sw, innerHeight: sh } = window;

      const leftSpace = bx + bw - margin;
      const rightSpace = sw - bx - margin;
      const upSpace = by - margin;
      const downSpace = sh - by - bh - margin;

      let transformOriginX: 'left' | 'right' = 'right';
      let transformOriginY: 'top' | 'bottom' = 'top';
      let top, bottom, left, right;

      // default placing position left bottom

      if (rightSpace > leftSpace && cw > leftSpace) {
        // plcing in right
        left = bx < margin ? margin : bx;
        if (left + cw > sw - margin) left = sw - cw - margin;
        transformOriginX = 'left';
      } else {
        // placing in left
        right = sw - bx - bw < margin ? margin : sw - bx - bw;
        if (sw - right - margin < cw) right = sw - cw - margin;
      }

      if (upSpace > downSpace && ch > downSpace) {
        // placing in top
        bottom = sh - by + gap < margin ? margin : sh - by + gap;
        if (sh - bottom - margin < ch) bottom = sh - ch - margin;
        transformOriginY = 'bottom';
      } else {
        // placing in bottom
        top = by + bh + gap < margin ? margin : by + bh + gap;
        if (top + ch > sh - margin) top = sh - ch - margin;
      }

      callback({
        transformOriginX,
        transformOriginY,
        left,
        right,
        top,
        bottom,
      });
    } else callback(null);
  }, [buttonDimensions, containerDimensions, margin, gap, callback]);
}
