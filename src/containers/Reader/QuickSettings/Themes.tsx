import styles from './styles.module.scss';
import { ReaderThemes } from '../../Settings/views/Themes/ReaderThemes';
export const Themes: React.FC = () => {
  return (
    <div className={styles.container}>
      <ReaderThemes />
    </div>
  );
};
