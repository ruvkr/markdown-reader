import styles from './styles.module.scss';
import { AppThemes } from './AppThemes';
import { ReaderThemes } from './ReaderThemes';

export const Themes: React.FC = () => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>App theme</label>
      <AppThemes />
      <ReaderThemes />
    </div>
  );
};
