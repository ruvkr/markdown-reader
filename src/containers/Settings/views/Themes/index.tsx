import styles from './styles.module.scss';
import { AppThemes } from './AppThemes';

export const Themes: React.FC = () => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>App theme</label>
      <AppThemes />
      <label className={styles.label}>Reader theme</label>
      <label className={styles.label}>Code theme</label>
    </div>
  );
};
