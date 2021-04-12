import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import styles from './styles.module.scss';
import { Backdrop, ControlButtons, ControlItem } from '..';
import { useBackHandler } from '../../../hooks';

interface Props {
  controls?: ControlItem[];
  close?: () => void;
  onClose?: () => void;
  show: boolean;
  title: string;
}

export const Modal: React.FC<Props> = ({
  children,
  close,
  controls,
  onClose,
  show = false,
  title,
}) => {
  // handle back button
  useBackHandler({ handle: show, onBack: close });

  return createPortal(
    <>
      <Backdrop show={show} onClick={close} zIndex={999} />
      <AnimatePresence onExitComplete={onClose}>
        {show && (
          <div className={styles.container}>
            <ScModal
              $hasControls={Boolean(controls)}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={styles.modal}
            >
              <div className={styles.title}>{title}</div>
              <main className={styles.body}>{children}</main>
              {controls && <ControlButtons controls={controls} />}
            </ScModal>
          </div>
        )}
      </AnimatePresence>
    </>,
    document.getElementById('modals') as HTMLElement
  );
};

const ScModal = styled(motion.div)<{ $hasControls: boolean }>`
  grid-template-rows: ${p =>
    p.$hasControls ? 'auto minmax(0, 1fr) auto' : 'auto minmax(0, 1fr)'};
`;
