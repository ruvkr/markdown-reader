import clsx from 'clsx';
import styles from './iconbutton.module.scss';
import { UnstyledButton, UnstyledButtonProps } from './Button';

export const iconButtonClasses = {
  container: styles.container,
  focus: styles.focus,
  icon: styles.icon,
};

export interface IconButtonProps extends Omit<UnstyledButtonProps, 'classNames' | 'name' | 'badge'> {
  size?: string;
  icon: JSX.Element;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ className, size = '2.25rem', ...rest }) => {
  return (
    <UnstyledButton
      {...rest}
      style={{ '--size': size } as React.CSSProperties}
      classNames={{
        container: clsx(styles.container, className),
        focus: styles.focus,
        icon: styles.icon,
      }}
    />
  );
};
