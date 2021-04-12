import { useEffect, useRef, useCallback } from 'react';

export function useWindowResize(
  callback: () => void = () => {},
  interval: number = 100
) {
  const resizeTimeout = useRef<number | null>(null);

  const resizeHandler = useCallback(() => {
    if (resizeTimeout.current != null) window.clearTimeout(resizeTimeout.current);
    resizeTimeout.current = window.setTimeout(() => {
      resizeTimeout.current = null;
      callback();
    }, interval);
  }, [interval, callback]);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      if (resizeTimeout.current != null) window.clearTimeout(resizeTimeout.current);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);
}
