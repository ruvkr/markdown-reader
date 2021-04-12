import { useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { usePosition, PositionInfo } from './usePosition';
import styles from './container.module.scss';

interface Props {
  buttonRef: React.MutableRefObject<HTMLElement | null>;
  setDelayDirection: React.MutableRefObject<1 | -1>;
  onOutsideClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

export const Container: React.FC<Props> = ({
  children,
  buttonRef,
  setDelayDirection,
  onOutsideClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const position = useRef<PositionInfo | null>(null);

  usePosition({
    buttonRef,
    containerRef,
    callback: info => (position.current = info),
  });

  useLayoutEffect(() => {
    if (!position.current || !containerRef.current) return;
    const {
      left,
      right,
      top,
      bottom,
      transformOriginX,
      transformOriginY,
    } = position.current;
    const container = containerRef.current;

    // set transform origin
    container.style.transformOrigin = `${transformOriginX} ${transformOriginY}`;

    // set left or right
    if (left != null) container.style.left = left + 'px';
    else container.style.right = right + 'px';

    // set top or bottom
    if (top != null) {
      container.style.top = top + 'px';
      setDelayDirection.current = 1;
    } else {
      container.style.bottom = bottom + 'px';
      setDelayDirection.current = -1;
    }
  }, [setDelayDirection]);

  return createPortal(
    <>
      <div
        key='menu-backdrop'
        onClick={onOutsideClick}
        className={styles.backdrop}
      />
      <motion.div
        key='menu-container'
        ref={containerRef}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        className={styles.container}
      >
        <motion.div layout className={styles.background} />
        {children}
      </motion.div>
    </>,
    document.getElementById('others') as HTMLElement
  );
};
