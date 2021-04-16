import { useEffect, Fragment } from 'react';
import shallow from 'zustand/shallow';
import { useUiStore, UiStore, fontActions, FontInfo } from '../../../../store/ui';
import { useConfigsStore, ConfigsStore, configsActions, Font } from '../../../../store/configs';
import styles from './fonts.module.scss';
import { Selector } from '../../../../components/Selector';
import { FontItem } from './FontItem';
import { getFont } from './utils';

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
    onFontChange: (info: FontInfo) => void;
  }[] = [
    {
      id: 'interface_font',
      name: 'Interface font',
      currentFont: fonts.interfaceFont,
      onFontChange: info => {
        const font = getFont(info);
        font && configsActions.updateac({ font });
      },
    },
    {
      id: 'interface_serif_font',
      name: 'Interface serif font',
      currentFont: fonts.interfaceSerifFont,
      onFontChange: info => {
        const font = getFont(info);
        font && configsActions.updateac({ serifFont: font });
      },
    },
    {
      id: 'reader_font',
      name: 'Reader font',
      currentFont: fonts.docFont,
      onFontChange: info => {
        const font = getFont(info);
        font && configsActions.updaterc({ font });
      },
    },
    {
      id: 'reader_code_font',
      name: 'Reader code font',
      currentFont: fonts.docCodeFont,
      onFontChange: info => {
        const font = getFont(info);
        font && configsActions.updaterc({ codeFont: font });
      },
    },
    {
      id: 'reader_serif_font',
      name: 'Reader serif font',
      currentFont: fonts.docSerifFont,
      onFontChange: info => {
        const font = getFont(info);
        font && configsActions.updaterc({ serifFont: font });
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
          <Selector
            title={setting.name}
            currentSelected={fontInfos?.find(f => f.family === setting.currentFont.name)}
            options={fontInfos ?? []}
            uniqeBy='family'
            searchBy='family'
            searchResultCount={3}
            containerClass={styles.options}
            renderItem={FontItem}
            onChange={setting.onFontChange}
          />
        </Fragment>
      ))}
    </div>
  );
};
