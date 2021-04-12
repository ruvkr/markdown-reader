import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import styles from './styles.module.scss';
import { Backdrop } from '..';

interface Props {
  show: boolean;
  onClose?: () => void;
  onOutsideClick?: () => void;
  blockOutsideActivity?: boolean;
}

export const Popup: React.FC<Props> = ({
  children,
  show = false,
  onClose,
  onOutsideClick,
  blockOutsideActivity = false,
}) => {
  return createPortal(
    <>
      <Backdrop
        show={show && blockOutsideActivity}
        onClick={onOutsideClick}
        zIndex={997}
      />
      <AnimatePresence onExitComplete={onClose}>
        {show && (
          <motion.div
            className={styles.popup}
            variants={variants}
            initial='close'
            animate='open'
            exit='close'
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.getElementById('popups') as HTMLElement
  );
};

const variants: Variants = {
  close: {
    y: '100%',
    pointerEvents: 'none',
    transition: { type: 'spring', stiffness: 400, damping: 40 },
  },

  open: {
    y: 0,
    pointerEvents: 'all',
    transition: { type: 'spring', stiffness: 400, damping: 40 },
  },
};
