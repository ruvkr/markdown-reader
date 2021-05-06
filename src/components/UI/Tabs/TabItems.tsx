import { useRef } from 'react';
import styled, { css } from 'styled-components';
import clsx from 'clsx';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';
import styles from './tabitems.module.scss';
import { TabItem } from './types';

interface Props {
  show: boolean;
  items: TabItem[];
  active: number;
  className?: string;
  title?: string;
  onClick?: (item: TabItem, index: number) => void;
  onHide?: () => void;
}

export const TabItems: React.FC<Props> = ({ show, items, active, className, title, onClick, onHide }) => {
  const prevActive = useRef(active);
  const isActive = active > -1;
  const animate = show ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' };
  const animateBg = isActive ? { height: '100%' } : { height: '3.5rem' };

  const tabs = items.map((item, index) => {
    const Icon = item.icon;
    return (
      <Icon
        key={item.id}
        title={item.title}
        active={index === active}
        onClick={() => {
          prevActive.current = active;
          onClick && onClick(item, index);
        }}
      />
    );
  });

  return (
    <motion.div
      className={clsx(styles.container, className)}
      initial={animate}
      animate={animate}
      transition={tweenslow}
      onAnimationComplete={() => onHide && !show && onHide()}>
      <motion.div
        initial={animateBg}
        animate={animateBg}
        transition={tweenslow}
        className={clsx(styles.background, isActive && styles.active)}
        children={title && <div className={styles.title}>{title}</div>}
      />
      <AnimatePresence exitBeforeEnter>
        {isActive && (
          <ScContent
            $holdPlace={Boolean(title)}
            className={styles.content}
            key={active}
            variants={contentVariants}
            custom={prevActive.current}
            initial='hide'
            animate='show'
            exit='hide'
            children={items[active].content}
          />
        )}
      </AnimatePresence>
      <div className={styles.tabs}>{tabs}</div>
    </motion.div>
  );
};

const ScContent = styled(motion.div)<{ $holdPlace: boolean }>(p => {
  return (
    p.$holdPlace &&
    css`
      &::before {
        display: block;
        content: 'placeholder';
        width: 100%;
        padding: 0.5rem;
        pointer-events: none;
        opacity: 0;
      }
    `
  );
});

const tweenfast: Transition = { type: 'tween', duration: 0.15 };
const tweenslow: Transition = { type: 'tween', duration: 0.3 };

const contentVariants: Variants = {
  hide: { opacity: 0, transition: tweenfast },
  show: (prev: number) => ({
    opacity: 1,
    transition: { ...tweenfast, delay: prev > -1 ? 0 : 0.3 },
  }),
};
