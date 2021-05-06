import clsx from 'clsx';
import { Add } from '../../assets/icons/essentials';
import styles from './addbutton.module.scss';

interface AddButtonProps {
  active?: boolean;
  onClick?: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ active = false, onClick }) => {
  return (
    <button title='Add files' className={clsx(styles.addbutton, active && styles.active)} onClick={onClick}>
      <div tabIndex={-1} className={styles.focus}>
        <div className={styles.icon}>
          <div className={styles.wave} />
          <Add />
        </div>
      </div>
    </button>
  );
};
