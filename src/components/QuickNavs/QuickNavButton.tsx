import clsx from 'clsx';
import { UnstyledButton, UnstyledButtonProps } from '../UI';
import styles from './quicknavbutton.module.scss';

export interface QuickNavButtonProps extends Omit<UnstyledButtonProps, 'classNames' | 'name' | 'badge' | 'style'> {
  icon: JSX.Element;
  size?: string;
  active: boolean;
}

export const QuickNavButton: React.FC<QuickNavButtonProps> = ({ active, size = '2.5rem', ...rest }) => {
  return (
    <UnstyledButton
      {...rest}
      style={{ '--size': size } as React.CSSProperties}
      classNames={{
        container: clsx(styles.container, active && styles.active),
        focus: styles.focus,
        icon: styles.icon,
      }}
    />
  );
};
