import { useEffect, Fragment } from 'react';
import shallow from 'zustand/shallow';
import { ConfigsStore, useConfigsStore, configsActions, Font } from '../../../store/configs';
import { UiStore, useUiStore, fontActions } from '../../../store/ui';
import styles from './fonts.module.scss';
import { FontItem } from '../../Settings/views/Fonts/FontItem';
import { Selector } from '../../../components/Selector';
import { Text } from '../../../assets/icons/essentials';

const getAllfonts = (state: UiStore) => state.allFonts;
const getFonts = (state: ConfigsStore) => ({
  docFont: state.rc.font,
  docCodeFont: state.rc.codeFont,
  docSerifFont: state.rc.serifFont,
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
      id: 'reader_font',
      name: 'Font',
      currentFont: fonts.docFont,
      onFontChange: font => configsActions.updaterc({ font }),
    },
    {
      id: 'reader_code_font',
      name: 'Code font',
      currentFont: fonts.docCodeFont,
      onFontChange: font => configsActions.updaterc({ codeFont: font }),
    },
    {
      id: 'reader_serif_font',
      name: 'Serif font',
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