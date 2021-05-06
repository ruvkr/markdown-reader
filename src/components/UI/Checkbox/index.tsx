import clsx from 'clsx';
import styles from './styles.module.scss';
import { Checkmark } from '../../../assets/icons/essentials';

interface Props {
  checked?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  onChange?: (checked: boolean) => void;
  size?: string;
  className?: string;
}

export const Checkbox: React.FC<Props> = ({
  checked = false,
  disabled = false,
  focusable = true,
  onChange,
  size = '1.5rem',
  className,
}) => {
  return (
    <button
      style={{ '--size': size } as React.CSSProperties}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      tabIndex={focusable ? 0 : -1}
      className={clsx(styles.checkbox, checked && styles.checked, className)}>
      <div tabIndex={-1} className={styles.focus}>
        <div className={styles.checkmark}>
          <Checkmark />
        </div>
      </div>
    </button>
  );
};
