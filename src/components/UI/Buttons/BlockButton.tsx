import clsx from 'clsx';
import styles from './blockbuttons.module.scss';
import { UnstyledButton, UnstyledButtonProps } from './Button';

export const blockButtonClasses = {
  container: styles.container,
  focus: styles.focus,
  icon: styles.icon,
  name: styles.name,
};

export interface BlockButtonProps extends Omit<UnstyledButtonProps, 'classNames'> {
  name: string;
  className?: string;
}

export const BlockButton: React.FC<BlockButtonProps> = ({ className, ...rest }) => {
  return (
    <UnstyledButton
      {...rest}
      classNames={{
        container: clsx(styles.container, className),
        focus: styles.focus,
        icon: styles.icon,
        name: styles.name,
      }}
    />
  );
};
