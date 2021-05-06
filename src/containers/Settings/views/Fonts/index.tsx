import { useEffect, Fragment } from 'react';
import shallow from 'zustand/shallow';
import { useUiStore, UiStore, fontActions } from '../../../../store/ui';
import { useConfigsStore, ConfigsStore, configsActions, Font } from '../../../../store/configs';
import styles from './fonts.module.scss';
import { Selector } from '../../../../components/Selector';
import { FontItem } from './FontItem';
import { Text } from '../../../../assets/icons/essentials';

const getAllfonts = (state: UiStore) => state.allFonts;
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
  const allFonts = useUiStore(getAllfonts);
  const fonts = useConfigsStore(getFonts, shallow);

  const fontSettings: {
    id: string;
    name: string;
    currentFont: Font;
    onFontChange: (info: Font) => void;
  }[] = [
    {
      id: 'interface_font',
      name: 'Interface font',
      currentFont: fonts.interfaceFont,
      onFontChange: font => configsActions.updateac({ font }),
    },
    {
      id: 'interface_serif_font',
      name: 'Interface serif font',
      currentFont: fonts.interfaceSerifFont,
      onFontChange: font => configsActions.updateac({ serifFont: font }),
    },
    {
      id: 'reader_font',
      name: 'Reader font',
      currentFont: fonts.docFont,
      onFontChange: font => configsActions.updaterc({ font }),
    },
    {
      id: 'reader_code_font',
      name: 'Reader code font',
      currentFont: fonts.docCodeFont,
      onFontChange: font => configsActions.updaterc({ codeFont: font }),
    },
    {
      id: 'reader_serif_font',
      name: 'Reader serif font',
      currentFont: fonts.docSerifFont,
      onFontChange: font => configsActions.updaterc({ serifFont: font }),
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
            icon={<Text />}
            title={setting.name}
            currentSelected={setting.currentFont}
            options={allFonts ?? []}
            uniqeBy='name'
            searchBy='name'
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
