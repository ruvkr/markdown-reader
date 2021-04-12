import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore, UiStore } from '../../store/ui';
import { LogoV2 } from '../../components/UI';
import styles from './styles.module.scss';

const getLoading = (state: UiStore) => state.loading;

export const LoadingScreen: React.FC = () => {
  const loading = useUiStore(getLoading);

  return createPortal(
    <AnimatePresence>
      {loading && (
        <motion.div
          className={styles.container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'tween', duration: 0.3 }}>
          <LogoV2 size={100} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('others') as HTMLElement
  );
};
