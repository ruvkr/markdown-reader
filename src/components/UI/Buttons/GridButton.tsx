import clsx from 'clsx';
import styles from './gridbutton.module.scss';
import { UnstyledButton, UnstyledButtonProps } from './Button';

export const gridButtonClasses = {
  container: styles.container,
  focus: styles.focus,
  icon: styles.icon,
  name: styles.name,
};

export interface GridButtonProps extends Omit<UnstyledButtonProps, 'classNames' | 'badge'> {
  icon: JSX.Element;
  name: string;
  className?: string;
}

export const GridButton: React.FC<GridButtonProps> = ({ className, ...rest }) => {
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
