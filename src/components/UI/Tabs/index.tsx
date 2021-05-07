import { useState } from 'react';
import styles from './styles.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { TabItem } from './types';
import { TabItems } from './TabItems';

interface Props {
  show?: boolean;
  title?: string;
  tabItems: TabItem[];
  className?: string;
  blockBackground?: boolean;
  resetOnHide?: boolean;
  resetOnButtonClick?: boolean;
  setIsTabOpen?: (active: boolean) => void;
}

export const Tabs: React.FC<Props> = ({
  show = true,
  title,
  tabItems,
  className,
  blockBackground = false,
  resetOnHide = false,
  resetOnButtonClick = false,
  setIsTabOpen,
}) => {
  const [active, _setActive] = useState<number>(-1);
  const setActive = (value: number) => {
    _setActive(value);
    setIsTabOpen && setIsTabOpen(value !== -1);
  };

  const clickHandler = (item: TabItem, index: number) => {
    if (item.isButton) {
      resetOnButtonClick && index > -1 && setActive(-1);
      (!resetOnButtonClick || active === -1) && item.onClick && item.onClick();
    } else {
      if (index === active) index > -1 && setActive(-1);
      else setActive(index);
    }
  };

  return (
    <>
      {blockBackground && (
        <AnimatePresence>
          {active > -1 && (
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(-1)}
              transition={{ type: 'tween', duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      )}

      <TabItems
        show={show}
        items={tabItems}
        active={active}
        title={title}
        className={className}
        onClick={clickHandler}
        onHide={() => resetOnHide && active > -1 && setActive(-1)}
      />
    </>
  );
};
