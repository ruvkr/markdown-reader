import { ControlItem, GridButton } from '../../components/UI';
import styles from './controls.module.scss';

interface Props {
  controls: ControlItem[];
}

export const Controls: React.FC<Props> = ({ controls }) => {
  const _controls = controls.map(item => (
    <GridButton
      key={item.id}
      icon={item.icon}
      name={item.name}
      disabled={item.disabled}
      onClick={item.onClick}
    />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.controls}>{_controls}</div>
    </div>
  );
};
