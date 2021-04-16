import styles from './themes.module.scss';
import { Selector } from '../../../components/Selector';
import { ThemeItem } from './ThemeItem';
import codeStyles from '../../../assets/styles/codeThemes';
import { useConfigsStore, ConfigsStore } from '../../../store/configs';
import shallow from 'zustand/shallow';

const codeThemeOptions = Object.keys(codeStyles).map(name => ({ id: name, name: name, title: name }));

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
        containerClass={styles.options}
        currentSelected={{ id: codeTheme, name: codeTheme, title: codeTheme }}
        renderItem={ThemeItem}
        showAll
      />
    </div>
  );
};
