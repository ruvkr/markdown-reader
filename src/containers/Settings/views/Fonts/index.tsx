import { useEffect, Fragment } from 'react';
import shallow from 'zustand/shallow';
import { useUiStore, UiStore, fontActions } from '../../../../store/ui';
import {
  useConfigsStore,
  ConfigsStore,
  configsActions,
  Font,
} from '../../../../store/configs';
import styles from './appearence.module.scss';
import { FontSelector } from '../../../../components/FontSelector';

const getFontInfos = (state: UiStore) => state.fontInfos;
const getFonts = (state: ConfigsStore) => ({
  docFont: state.rc.font,
  docCodeFont: state.rc.codeFont,
  docSerifFont: state.rc.serifFont,
  interfaceFont: state.ac.font,
  interfaceSerifFont: state.ac.serifFont,
  docFontSize: state.rc.fontSize,
  docCodeFontSize: state.rc.codeFontSize,
  docSerifFontSize: state.rc.serifFontSize,
  interfaceFontSize: state.ac.fontSize,
  interfaceSerifFontSize: state.ac.serifFontSize,
});

export const Fonts: React.FC = () => {
  const fontInfos = useUiStore(getFontInfos);
  const fonts = useConfigsStore(getFonts, shallow);

  const fontSettings: {
    id: string;
    name: string;
    currentFont: Font;
    currentFontSize: number;
    onSave: (info: { font: Font; size: number }) => void;
  }[] = [
    {
      id: 'interface_font',
      name: 'Interface font',
      currentFont: fonts.interfaceFont,
      currentFontSize: fonts.interfaceFontSize,
      onSave: info => {
        configsActions.updateac({
          font: info.font,
          fontSize: info.size,
        });
      },
    },
    {
      id: 'interface_serif_font',
      name: 'Interface serif font',
      currentFont: fonts.interfaceSerifFont,
      currentFontSize: fonts.interfaceSerifFontSize,
      onSave: info => {
        configsActions.updateac({
          serifFont: info.font,
          serifFontSize: info.size,
        });
      },
    },
    {
      id: 'reader_font',
      name: 'Reader font',
      currentFont: fonts.docFont,
      currentFontSize: fonts.docFontSize,
      onSave: info => {
        configsActions.updaterc({
          font: info.font,
          fontSize: info.size,
        });
      },
    },
    {
      id: 'reader_code_font',
      name: 'Reader code font',
      currentFont: fonts.docCodeFont,
      currentFontSize: fonts.docCodeFontSize,
      onSave: info => {
        configsActions.updaterc({
          codeFont: info.font,
          codeFontSize: info.size,
        });
      },
    },
    {
      id: 'reader_serif_font',
      name: 'Reader serif font',
      currentFont: fonts.docSerifFont,
      currentFontSize: fonts.docSerifFontSize,
      onSave: info => {
        configsActions.updaterc({
          serifFont: info.font,
          serifFontSize: info.size,
        });
      },
    },
  ];

  useEffect(() => {
    // load font infos in store
    fontActions.loadFontInfos();
  }, []);

  return (
    <div className={styles.container}>
      {fontSettings.map(setting => (
        <Fragment key={setting.id}>
          <label className={styles.label}>{setting.name}</label>
          <FontSelector
            fontInfos={fontInfos}
            currentFont={setting.currentFont}
            currentFontSize={setting.currentFontSize}
            onSave={setting.onSave}
          />
        </Fragment>
      ))}
    </div>
  );
};
