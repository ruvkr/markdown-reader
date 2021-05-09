import { Fragment } from 'react';
import shallow from 'zustand/shallow';
import { useUiStore, UiStore } from '../../../../store/ui';
import { useConfigsStore, ConfigsStore, configsActions, Font } from '../../../../store/configs';
import styles from './fonts.module.scss';
import { Selector, Toggler } from '../../../../components/Selector';
import { FontItem } from './FontItem';
import { Text, EllipsisHorizontal } from '../../../../assets/icons/essentials';

const getAllfonts = (state: UiStore) => state.allFonts;
const getFonts = (state: ConfigsStore) => ({
  docFont: state.rc.font,
  docCodeFont: state.rc.codeFont,
  docSerifFont: state.rc.serifFont,
});

export const ReaderFonts: React.FC = () => {
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

  return (
    <>
      {fontSettings.map(setting => (
        <Fragment key={setting.id}>
          <label className={styles.label}>{setting.name}</label>
          <Selector
            title={setting.name}
            currentSelected={setting.currentFont}
            options={allFonts ?? []}
            uniqeBy='name'
            searchBy='name'
            searchResultCount={3}
            containerClassName={styles.options}
            onChange={setting.onFontChange}
            renderItem={FontItem}
            renderToggler={props => (
              <Toggler //
                {...props}
                icon={<Text />}
                badge={<EllipsisHorizontal />}
              />
            )}
          />
        </Fragment>
      ))}
    </>
  );
};
