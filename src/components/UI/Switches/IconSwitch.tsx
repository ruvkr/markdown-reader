import clsx from 'clsx';
import styles from './iconswitch.module.scss';

interface Props {
  offIcon?: JSX.Element;
  onIcon?: JSX.Element;
  on?: boolean;
  size?: string;
  disabled?: boolean;
  focusable?: boolean;
  onChange?: (on: boolean) => void;
  className?: string;
}

export const IconSwitch: React.FC<Props> = ({
  on = false,
  size = '2.25rem',
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
      style={{ '--size': size } as React.CSSProperties}
      className={clsx(styles.iconswitch, on && styles.on, className)}>
      <div tabIndex={-1} className={styles.focus}>
        <div className={styles.marker} />
        <div className={clsx(styles.icon, styles.iconoff)} children={offIcon} />
        <div className={clsx(styles.icon, styles.iconon)} children={onIcon} />
      </div>
    </button>
  );
};
