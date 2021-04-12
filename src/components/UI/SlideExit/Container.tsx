import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSlideExit } from './useSlideExit';
import styles from './styles.module.scss';
import clsx from 'clsx';

interface Props {
  onOpen?: () => void;
  onClose?: () => void;
  startRange?: (width: number) => number;
  opened?: boolean;
  className?: string;
}

export const Container: React.FC<Props> = ({
  children,
  opened,
  onOpen,
  onClose,
  className,
  startRange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { progress, motionX, exit } = useSlideExit({
    containerRef,
    onOpen,
    onClose,
    startRange,
  });

  useEffect(() => {
    if (opened) return;
    const timeout = window.setTimeout(exit);
    return () => window.clearTimeout(timeout);
  }, [opened, exit]);

  return (
    <>
      <motion.div
        ref={containerRef}
        className={clsx(styles.container, className)}
        style={{ x: motionX }}
        children={children}
      />
      <motion.div style={{ opacity: progress }} className={styles.backdrop} />
    </>
  );
};
