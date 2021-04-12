import { useRef, useEffect, memo } from 'react';
import styles from './styles.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { match } from 'path-to-regexp';
import { useLocation } from '../../hooks';
import { viewActions } from '../../store/ui';
import { views } from './views';
import { IView } from './types';
import { Navs } from '../../components/Navs';

export const Views: React.FC = () => {
  const { pathname } = useLocation();
  const matched = views.find(view => {
    const matchFunc = match(view.path, { decode: decodeURIComponent });
    return matchFunc(pathname);
  });

  const validMatched = useRef<IView>(matched ?? views[0]);
  matched && (validMatched.current = matched);
  const name = validMatched.current.name;

  useEffect(() => {
    viewActions.changeView(name);
  }, [name]);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <AnimatePresence exitBeforeEnter>
          <Content item={validMatched.current} />
        </AnimatePresence>
      </div>
      <Navs />
    </div>
  );
};

const Content: React.FC<{ item: IView }> = memo(
  ({ item }) => (
    <motion.div
      className={styles.motioncontainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'tween', duration: 0.15 }}
      key={item.id}>
      <item.component />
    </motion.div>
  ),
  (prev, next) => prev.item.id === next.item.id
);
