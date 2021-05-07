import shallow from 'zustand/shallow';
import styles from './themes.module.scss';
import { Selector, Toggler } from '../../../components/Selector';
import { ThemeItem } from './ThemeItem';
import codeStyles from '../../../assets/styles/codeThemes';
import { useConfigsStore, ConfigsStore } from '../../../store/configs';
import { EllipsisHorizontal, ColorPalette } from '../../../assets/icons/essentials';
import { configsActions } from '../../../store/configs';

const codeThemeOptions = Object.keys(codeStyles).map(name => ({
  id: name,
  name: name as keyof typeof codeStyles,
  title: name,
}));

const getThemes = (state: ConfigsStore) => ({
  codeTheme: state.rc.codeTheme,
  docTheme: state.rc.docTheme,
});

export const Themes: React.FC = () => {
  const { codeTheme } = useConfigsStore(getThemes, shallow);

  return (
    <div className={styles.container}>
      <label className={styles.label}>Code theme</label>
      <Selector
        title='Select code theme'
        options={codeThemeOptions}
        uniqeBy='id'
        searchBy='name'
        containerClassName={styles.options}
        onChange={info => configsActions.updaterc({ codeTheme: info.name })}
        currentSelected={{ id: codeTheme, name: codeTheme, title: codeTheme }}
        showAll
        renderItem={ThemeItem}
        renderToggler={props => (
          <Toggler //
            {...props}
            icon={<ColorPalette />}
            badge={<EllipsisHorizontal />}
          />
        )}
      />
    </div>
  );
};
