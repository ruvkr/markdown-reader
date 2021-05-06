import clsx from 'clsx';
import styles from './styles.module.scss';
import { UnstyledButton, UnstyledButtonProps } from '../UI';

interface NavItemProps extends Omit<UnstyledButtonProps, 'classNames' | 'name' | 'badge'> {
  active?: boolean;
  icon: JSX.Element;
}

export const NavItem: React.FC<NavItemProps> = ({ active = false, ...rest }) => {
  return (
    <UnstyledButton
      {...rest}
      classNames={{
        container: clsx(styles.navitem, active && styles.active),
        focus: styles.focus,
        icon: styles.icon,
      }}
    />
  );
};
