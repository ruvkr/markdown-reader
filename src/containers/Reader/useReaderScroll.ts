import { useCallback, useEffect, useRef } from 'react';
import { ScrollInfo } from './types';

export function useReaderScroll(
  ref: React.RefObject<HTMLElement | null>,
  callback?: (info: ScrollInfo) => void
) {
  const prevScrollTop = useRef<number>(0);
  const blockScroll = useRef(false);
  const blockTimeout = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  const setBlockScroll = useCallback(() => {
    blockScroll.current = true;

    // clear prev timeout
    if (blockTimeout.current != null) window.clearTimeout(blockTimeout.current);

    // 500ms scroll timeout
    blockTimeout.current = window.setTimeout(() => {
      blockTimeout.current = null;
      blockScroll.current = false;
    }, 500);
  }, []);

  const setScroll = useCallback(
    /**
     * @param to A number between `0-1` or `querySelector` string
     */
    (to: number | string) => {
      if (!ref.current) return;

      // number between 0-1
      if (typeof to === 'number' && !isNaN(to) && to >= 0 && to <= 1) {
        // block event listener for this scroll
        setBlockScroll();
        const { scrollHeight, offsetHeight } = ref.current;
        const max = scrollHeight - offsetHeight;
        const scrollTop = Math.round(max * to);
        ref.current.scrollTo(0, scrollTop);
        prevScrollTop.current = scrollTop;
      }

      // if querySelector string
      else if (typeof to === 'string') {
        const element = document.querySelector(to);
        if (!element) return;
        // block event listener for this scroll
        setBlockScroll();
        element.scrollIntoView();
        prevScrollTop.current = ref.current.scrollTop;
      }
    },
    [ref, setBlockScroll]
  );

  // update callback ref
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // handle scroll
  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;
    let scrollTimeout: number | null = null;

    const scrollHandler = () => {
      if (!ref.current) return;
      const { scrollHeight, offsetHeight, scrollTop } = ref.current;
      const bottom = scrollHeight - offsetHeight - scrollTop;
      const progress = scrollTop / (scrollHeight - offsetHeight);
      const direction: 'up' | 'down' =
        scrollTop > prevScrollTop.current ? 'down' : 'up';
      prevScrollTop.current = scrollTop;
      const scrollInfo = { top: scrollTop, bottom, progress, direction };

      callbackRef.current && callbackRef.current(scrollInfo);
      ref.current.dispatchEvent(
        new CustomEvent<ScrollInfo>('reader-scroll', {
          detail: scrollInfo,
          bubbles: true,
          cancelable: true,
        })
      );
    };

    const handler = () => {
      if (scrollTimeout != null || blockScroll.current) return;
      scrollTimeout = window.setTimeout(() => {
        scrollHandler();
        scrollTimeout = null;
      }, 100);
    };

    // adding native listener because dangerouslySetInnerHTML broke
    // react's onScroll listener
    container.addEventListener('scroll', handler);

    window.addEventListener('load', () => {
      console.log('loaded');
    });

    return () => {
      if (scrollTimeout != null) window.clearTimeout(scrollTimeout);
      if (blockTimeout.current != null) window.clearTimeout(blockTimeout.current);
      container.removeEventListener('scroll', handler);
    };
  }, [ref]);

  return { setScroll };
}
