import styled from 'styled-components';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import styles from './switch.module.scss';

interface Props {
  on?: boolean;
  size?: number;
  disabled?: boolean;
  focusable?: boolean;
  onChange?: (on: boolean) => void;
  className?: string;
}

export const Switch: React.FC<Props> = ({
  on = false,
  size = 24,
  disabled = false,
  focusable = true,
  onChange,
  className,
}) => {
  return (
    <ScSwitch
      $size={size}
      disabled={disabled}
      onClick={() => onChange && onChange(!on)}
      tabIndex={focusable ? 0 : -1}
      className={clsx(styles.switch, on && styles.on, className)}
      style={{ width: (size * 44) / 24, height: size }}
    >
      <div tabIndex={-1} className={styles.focus}>
        <svg viewBox='0 0 44 24' width='100%' height='100%'>
          <motion.path
            className={styles.path}
            variants={pathVariants}
            initial={on ? 'on' : 'off'}
            animate={on ? 'on' : 'off'}
          />
        </svg>
      </div>
    </ScSwitch>
  );
};

const offFrames = [
  'M42 12C42 17.5228 37.5228 22 32 22C26.4772 22 22 17.5228 22 12C22 6.47715 26.4772 2 32 2C37.5228 2 42 6.47715 42 12Z',
  'M42 12C42 17.5228 37.5228 22 32 22C26.4772 22 2 19 2 12C2 5 26.4772 2 32 2C37.5228 2 42 6.47715 42 12Z',
  'M16 12C16 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 16 6.47715 16 12Z',
  'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
];

const onFrames = [
  'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
  'M42 12C42 19 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 42 5 42 12Z',
  'M42 12C42 17.5228 37.5229 22 32 22C26.4772 22 28 17.5228 28 12C28 6.47715 26.4772 2 32 2C37.5229 2 42 6.47715 42 12Z',
  'M42 12C42 17.5228 37.5228 22 32 22C26.4772 22 22 17.5228 22 12C22 6.47715 26.4772 2 32 2C37.5228 2 42 6.47715 42 12Z',
];

const pathVariants: Variants = {
  off: {
    d: offFrames,
    transition: { duration: 0.5, times: [0, 0.25, 0.6, 1] },
  },
  on: {
    d: onFrames,
    transition: { duration: 0.5, times: [0, 0.25, 0.6, 1] },
  },
};

const ScSwitch = styled.button<{ $size: number }>`
  width: ${p => (p.$size * 44) / 24}px;
  height: ${p => p.$size}px;
`;
