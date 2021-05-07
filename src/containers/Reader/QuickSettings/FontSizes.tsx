import { Fragment } from 'react';
import shallow from 'zustand/shallow';
import { ConfigsStore, useConfigsStore, configsActions } from '../../../store/configs';
import styles from './fonts.module.scss';
import { FontSizer } from '../../Settings/views/Fonts/FontSizer';

const getFontSizes = (state: ConfigsStore) => ({
  docFontSize: state.rc.fontSize,
  docCodeFontSize: state.rc.codeFontSize,
});

export const FontSizes: React.FC = () => {
  const fontSizes = useConfigsStore(getFontSizes, shallow);

  const fontSizeSettings: {
    id: string;
    name: string;
    currentSize: number;
    onSizeChange: (newSize: number) => void;
  }[] = [
    {
      id: 'reader_font_size',
      name: 'Font size',
      currentSize: fontSizes.docFontSize,
      onSizeChange: newSize => configsActions.updaterc({ fontSize: newSize }),
    },
    {
      id: 'reader_code_font_size',
      name: 'Code font size',
      currentSize: fontSizes.docCodeFontSize,
      onSizeChange: newSize => configsActions.updaterc({ codeFontSize: newSize }),
    },
  ];

  return (
    <div className={styles.container}>
      {fontSizeSettings.map(setting => (
        <Fragment key={setting.id}>
          <label className={styles.label}>{setting.name}</label>
          <FontSizer defaultValue={setting.currentSize} onSizeChange={setting.onSizeChange} />
        </Fragment>
      ))}
    </div>
  );
};
