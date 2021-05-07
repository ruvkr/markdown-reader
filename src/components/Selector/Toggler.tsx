import clsx from 'clsx';
import styles from './toggler.module.scss';
import { UnstyledButton, UnstyledButtonProps } from '../UI';

export interface TogglerProps extends Omit<UnstyledButtonProps, 'classNames'> {
  className?: string;
}

export const Toggler: React.FC<TogglerProps> = ({ className, ...rest }) => {
  return (
    <UnstyledButton
      {...rest}
      classNames={{
        container: clsx(styles.toggler, className),
        focus: styles.focus,
        icon: styles.icon,
        name: styles.name,
      }}
    />
  );
};
