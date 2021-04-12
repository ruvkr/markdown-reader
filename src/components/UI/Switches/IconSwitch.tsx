import styled from 'styled-components';
import clsx from 'clsx';
import styles from './iconswitch.module.scss';

interface Props {
  offIcon?: JSX.Element;
  onIcon?: JSX.Element;
  on?: boolean;
  size?: number;
  disabled?: boolean;
  focusable?: boolean;
  onChange?: (on: boolean) => void;
  className?: string;
}

export const IconSwitch: React.FC<Props> = ({
  on = false,
  size = 36,
  disabled = false,
  focusable = true,
  onChange,
  className,
  offIcon,
  onIcon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onChange && onChange(!on)}
      tabIndex={focusable ? 0 : -1}
      className={clsx(styles.iconswitch, on && styles.on, className)}
    >
      <div tabIndex={-1} className={styles.focus}>
        <ScMarker $size={size} className={styles.marker} />
        <ScIcon
          $size={size}
          className={clsx(styles.icon, styles.iconoff)}
          children={offIcon}
        />
        <ScIcon
          $size={size}
          className={clsx(styles.icon, styles.iconon)}
          children={onIcon}
        />
      </div>
    </button>
  );
};

const ScIcon = styled.div<{ $size: number }>`
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
  padding: ${p => (p.$size * 5) / 18}px;
`;
const ScMarker = styled.div<{ $size: number }>`
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
`;
