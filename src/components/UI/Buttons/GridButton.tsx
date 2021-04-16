import clsx from 'clsx';
import styles from './gridbutton.module.scss';
import { ButtonBare } from './Button';

export const gridButtonClasses = {
  container: styles.container,
  focus: styles.focus,
  icon: styles.icon,
  name: styles.name,
};

export interface GridButtonProps {
  disabled?: boolean;
  icon: JSX.Element;
  name: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  forwardRef?: React.MutableRefObject<HTMLButtonElement | null>;
}

export const GridButton: React.FC<GridButtonProps> = ({ className, ...rest }) => {
  return (
    <ButtonBare
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
