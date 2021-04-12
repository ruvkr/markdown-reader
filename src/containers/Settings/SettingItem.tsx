import clsx from 'clsx';
import styles from './settingitem.module.scss';

interface Props {
  icon: JSX.Element;
  name: string;
  title: string;
  info: string;
  onClick?: () => void;
  active?: boolean;
}

export const SettingItem: React.FC<Props> = ({ icon, name, title, info, onClick, active = false }) => {
  return (
    <div onClick={onClick} title={title} className={clsx(styles.item, active && styles.active)}>
      <div tabIndex={-1} className={styles.focus}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.details}>
          <div className={styles.name}>{name}</div>
          <div className={styles.info}>{info}</div>
        </div>
      </div>
    </div>
  );
};
