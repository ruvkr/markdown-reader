import styles from './slider.module.scss';

interface Props {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  unit?: string;
}

export const Slider: React.FC<Props> = ({
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  unit = '',
  value,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.limit}>{min}</div>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        className={styles.slider}
        onChange={event => {
          const target = event.target as HTMLInputElement;
          const value = Number(target.value);
          onChange && onChange(value);
        }}
      />
      <div className={styles.limit}>{max}</div>
      <div className={styles.value}>{value + unit}</div>
    </div>
  );
};
