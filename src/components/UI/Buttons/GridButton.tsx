import clsx from 'clsx';
import styles from './gridbutton.module.scss';
export const gridButtonClasses = {
  gridbutton: styles.gridbutton,
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
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  forwardRef?: React.MutableRefObject<HTMLButtonElement | null>;
}

export const GridButton: React.FC<GridButtonProps> = ({
  disabled = false,
  icon,
  name,
  title,
  className,
  onClick,
  forwardRef,
}) => {
  return (
    <button
      className={clsx(styles.gridbutton, className)}
      title={title ?? name}
      disabled={disabled}
      onClick={onClick}
      ref={forwardRef}>
      <div tabIndex={-1} className={styles.focus}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.name}>{name}</div>
      </div>
    </button>
  );
};
