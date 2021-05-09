import { useEffect } from 'react';
import { fontActions } from '../../../store/ui';
import styles from './styles.module.scss';
import { ReaderFonts } from '../../Settings/views/Fonts/ReaderFonts';

export const Fonts: React.FC = () => {
  useEffect(() => {
    // load font infos in store
    fontActions.loadFontInfos();
  }, []);

  return (
    <div className={styles.container}>
      <ReaderFonts />
    </div>
  );
};
