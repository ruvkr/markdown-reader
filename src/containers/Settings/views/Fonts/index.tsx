import { useEffect } from 'react';
import { fontActions } from '../../../../store/ui';
import styles from './fonts.module.scss';
import { AppFont } from './AppFont';
import { ReaderFonts } from './ReaderFonts';
import { AppFontSizer } from './AppFontSizer';
import { ReaderFontSizer } from './ReaderFontSizer';

export const Fonts: React.FC = () => {
  useEffect(() => {
    // load font infos in store
    fontActions.loadFontInfos();
  }, []);

  return (
    <div className={styles.container}>
      <AppFont />
      <ReaderFonts />
      <AppFontSizer />
      <ReaderFontSizer />
    </div>
  );
};
