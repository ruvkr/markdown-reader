import { Fragment } from 'react';
import { useUiStore, UiStore } from '../../../../store/ui';
import { useConfigsStore, ConfigsStore, configsActions } from '../../../../store/configs';
import styles from './fonts.module.scss';
import { Selector, Toggler } from '../../../../components/Selector';
import { FontItem } from './FontItem';
import { Text, EllipsisHorizontal } from '../../../../assets/icons/essentials';

const getAllfonts = (state: UiStore) => state.allFonts;
const getFont = (state: ConfigsStore) => state.ac.font;

export const AppFont: React.FC = () => {
  const allFonts = useUiStore(getAllfonts);
  const font = useConfigsStore(getFont);

  return (
    <>
      <label className={styles.label}>Interface font</label>
      <Selector
        title='Interface font'
        currentSelected={font}
        options={allFonts ?? []}
        uniqeBy='name'
        searchBy='name'
        searchResultCount={3}
        containerClassName={styles.options}
        onChange={font => configsActions.updateac({ font })}
        renderItem={FontItem}
        renderToggler={props => (
          <Toggler //
            {...props}
            icon={<Text />}
            badge={<EllipsisHorizontal />}
          />
        )}
      />
    </>
  );
};
