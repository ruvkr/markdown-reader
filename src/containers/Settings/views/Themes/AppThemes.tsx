import { v4 as uuid } from 'uuid';
import clsx from 'clsx';
import styles from './themes.module.scss';

const themes = [
  { id: uuid(), name: 'Default', active: true },
  { id: uuid(), name: 'Dark', disabled: false },
  { id: uuid(), name: 'Disabled', disabled: true },
];

export const AppThemes: React.FC = () => {
  return (
    <div className={styles.container}>
      {themes.map(theme => (
        <button
          key={theme.id}
          className={clsx(styles.themeitem, theme.active && styles.active)}
          onClick={() => {}}
          disabled={theme.disabled}>
          <div tabIndex={-1} className={styles.focus}>
            <div className={styles.icon}>
              {placeholder}
              {theme.active && <div className={styles.mark} />}
            </div>
            <div className={styles.name}>{theme.name}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

const placeholder = <svg width='100%' height='100%' viewBox='0 0 512 512' fill='none' stroke='none' />;
