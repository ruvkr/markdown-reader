import clsx from 'clsx';
import { ControlItem } from './types';
import { Button } from '..';
import styles from './styles.module.scss';

interface Props {
  controls: ControlItem[];
  className?: string;
}

export const ControlButtons: React.FC<Props> = ({ controls, className }) => {
  const _controls = controls.map(item => (
    <Button
      key={item.id}
      disabled={item.disabled}
      icon={item.icon}
      name={item.name}
      onClick={item.onClick}
    />
  ));

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.controls}>{_controls}</div>
    </div>
  );
};
