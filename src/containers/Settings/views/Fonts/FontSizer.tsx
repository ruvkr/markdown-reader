import { useState } from 'react';
import styles from './fontsizer.module.scss';
import { Button, Slider } from '../../../../components/UI';

interface FontSizerProps {
  defaultValue: number;
  onSizeChange: (newSize: number) => void;
}

export const FontSizer: React.FC<FontSizerProps> = ({ defaultValue, onSizeChange }) => {
  const [value, setValue] = useState(defaultValue);
  const needChange = value !== defaultValue;
  const onApplyHandler = () => needChange && onSizeChange(value);

  return (
    <div className={styles.container}>
      <Slider min={10} max={48} step={1} unit='px' value={value} onChange={setValue} />
      <Button name='Apply' disabled={!needChange} onClick={onApplyHandler} />
    </div>
  );
};
