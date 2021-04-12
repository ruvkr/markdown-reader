import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import styles from './styles.module.scss';

interface Props {
  show?: boolean;
  onClick?: () => void;
  zIndex?: number;
}

export const Backdrop: React.FC<Props> = ({
  show = false,
  zIndex = 100,
  onClick,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <ScBackdrop
          $zIndex={zIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'tween', duration: 0.3 }}
          onClick={onClick}
          className={styles.backdrop}
        />
      )}
    </AnimatePresence>
  );
};

const ScBackdrop = styled(motion.div)<{ $zIndex: number }>`
  z-index: ${p => p.$zIndex};
`;
