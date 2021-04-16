import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './input.module.scss';

interface Props {
  disabled?: boolean;
  focus?: boolean;
  invalid?: boolean;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  select?: boolean;
  type?: string;
  value?: string;
  className?: string;
  placeholder?: string;
}

export const Input: React.FC<Props> = ({
  disabled = false,
  focus = false,
  invalid = false,
  onChange,
  onSubmit,
  select = false,
  type = 'text',
  value,
  className,
  placeholder,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    onChange && onChange(value);
  };

  const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    !invalid && !disabled && event.key === 'Enter' && onSubmit && onSubmit();
  };

  useEffect(() => {
    if (!inputRef.current) return;
    focus && inputRef.current.focus();
    select && inputRef.current.select();
  }, [focus, select]);

  return (
    <input
      value={value}
      onChange={changeHandler}
      onKeyPress={keyPressHandler}
      disabled={disabled}
      type={type}
      ref={inputRef}
      className={clsx(styles.input, invalid && styles.invalid, className)}
      placeholder={placeholder}
    />
  );
};
