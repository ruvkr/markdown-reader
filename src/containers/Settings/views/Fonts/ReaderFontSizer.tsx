import { Fragment } from 'react';
import shallow from 'zustand/shallow';
import { useConfigsStore, ConfigsStore, configsActions } from '../../../../store/configs';
import styles from './fonts.module.scss';
import { FontSizer } from './FontSizer';

const getFonts = (state: ConfigsStore) => ({
  docFontSize: state.rc.fontSize,
  docCodeFontSize: state.rc.codeFontSize,
});

export const ReaderFontSizer: React.FC = () => {
  const fonts = useConfigsStore(getFonts, shallow);

  const fontSizeSettings: {
    id: string;
    name: string;
    currentSize: number;
    onSizeChange: (newSize: number) => void;
  }[] = [
    {
      id: 'reader_font_size',
      name: 'Reader font size',
      currentSize: fonts.docFontSize,
      onSizeChange: newSize => configsActions.updaterc({ fontSize: newSize }),
    },
    {
      id: 'reader_code_font_size',
      name: 'Reader code font size',
      currentSize: fonts.docCodeFontSize,
      onSizeChange: newSize => configsActions.updaterc({ codeFontSize: newSize }),
    },
  ];

  return (
    <>
      {fontSizeSettings.map(setting => (
        <Fragment key={setting.id}>
          <label className={styles.label}>{setting.name}</label>
          <FontSizer defaultValue={setting.currentSize} onSizeChange={setting.onSizeChange} />
        </Fragment>
      ))}
    </>
  );
};
