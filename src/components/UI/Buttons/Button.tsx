import clsx from 'clsx';
import styles from './button.module.scss';

export const buttonClasses = {
  container: styles.container,
  focus: styles.focus,
  icon: styles.icon,
  name: styles.name,
};

export interface ButtonBareProps {
  disabled?: boolean;
  icon?: JSX.Element;
  name?: string;
  title?: string;
  badge?: JSX.Element;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  forwardRef?: React.MutableRefObject<HTMLButtonElement | null>;
  classNames?: {
    container?: string;
    focus?: string;
    icon?: string;
    name?: string;
  };
}

export interface ButtonProps extends Omit<ButtonBareProps, 'classNames'> {
  className?: string;
}

export const ButtonBare: React.FC<ButtonBareProps> = ({
  disabled = false,
  icon,
  name,
  title,
  classNames,
  onClick,
  badge,
  style,
  forwardRef,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      title={title ?? name}
      className={classNames?.container}
      style={style}
      ref={forwardRef}>
      <div tabIndex={-1} className={classNames?.focus}>
        {icon && <div className={classNames?.icon}>{icon}</div>}
        {name && <div className={classNames?.name} children={name} />}
        {badge && <div className={classNames?.icon}>{badge}</div>}
      </div>
    </button>
  );
};

export const Button: React.FC<ButtonProps> = ({ className, ...rest }) => {
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
