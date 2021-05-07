import { useEffect, useRef, useState } from 'react';
import { ScrollInfo } from '../../containers/Reader';

interface Configs {
  bottomLimit?: number;
  toggleOnClick?: boolean;
  initialDelay?: number;
  isTabOpen: React.MutableRefObject<boolean>;
}

export function useHideOnReaderScroll(configs: Configs = {} as Configs) {
  const { bottomLimit = 50, toggleOnClick = false, initialDelay = 0, isTabOpen } = configs;
  const [show, setShow] = useState(initialDelay === 0);

  const showRef = useRef(show);
  const blref = useRef(bottomLimit);
  const tcref = useRef(toggleOnClick);
  const idref = useRef(initialDelay);

  // update refs
  useEffect(() => {
    blref.current = bottomLimit;
    tcref.current = toggleOnClick;
    idref.current = initialDelay;
  }, [initialDelay, bottomLimit, toggleOnClick]);

  useEffect(() => {
    const mdrc = document.getElementById('__mdrc__');
    if (!mdrc) return;

    const toggleShow = (value?: boolean) => {
      if (typeof value === 'boolean') {
        value !== showRef.current && setShow((showRef.current = value));
      } else setShow(p => (showRef.current = !p));
    };

    const scrollHandler = (event: CustomEvent<ScrollInfo>) => {
      if (isTabOpen.current) return;
      const { direction, bottom } = event.detail;
      if (bottom <= blref.current) toggleShow(true);
      else toggleShow(direction === 'up');
    };

    // toggle show on click
    const clickHandler = () => toggleShow();

    // initialDelay timeout
    const timeout = window.setTimeout(() => {
      idref.current !== 0 && toggleShow(true);
      mdrc.addEventListener('reader-scroll', scrollHandler as EventListener);
      tcref.current && mdrc.addEventListener('click', clickHandler);
    }, idref.current * 1000);

    return () => {
      window.clearTimeout(timeout);
      mdrc.removeEventListener('reader-scroll', scrollHandler as EventListener);
      mdrc.removeEventListener('click', clickHandler);
    };
  }, [isTabOpen]);

  return show;
}
