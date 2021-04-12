import styled from 'styled-components';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { Checkmark } from '../../../assets/icons/essentials';

interface Props {
  checked?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  onChange?: (checked: boolean) => void;
  size?: number;
  className?: string;
}

export const Checkbox: React.FC<Props> = ({
  checked = false,
  disabled = false,
  focusable = true,
  onChange,
  size = 24,
  className,
}) => {
  return (
    <ScCheckbox
      $size={size}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      tabIndex={focusable ? 0 : -1}
      className={clsx(styles.checkbox, checked && styles.checked, className)}
    >
      <div tabIndex={-1} className={styles.focus}>
        <div className={styles.checkmark}>
          <Checkmark />
        </div>
      </div>
    </ScCheckbox>
  );
};

const ScCheckbox = styled.button<{ $size: number }>`
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
`;
