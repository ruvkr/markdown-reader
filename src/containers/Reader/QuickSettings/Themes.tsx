import { Fragment } from 'react';
import shallow from 'zustand/shallow';
import styles from './themes.module.scss';
import { Selector, Toggler } from '../../../components/Selector';
import { ThemeItem } from './ThemeItem';
import docStyles from '../../../assets/styles/docThemes';
import codeStyles from '../../../assets/styles/codeThemes';
import { useConfigsStore, ConfigsStore } from '../../../store/configs';
import { EllipsisHorizontal, ColorPalette } from '../../../assets/icons/essentials';
import { configsActions } from '../../../store/configs';

const codeThemeOptions = Object.keys(codeStyles).map(name => ({ name }));
const docThemeOptions = Object.keys(docStyles).map(name => ({ name }));

const getThemes = (state: ConfigsStore) => ({
  codeTheme: state.rc.codeTheme,
  docTheme: state.rc.docTheme,
});

export const Themes: React.FC = () => {
  const { codeTheme, docTheme } = useConfigsStore(getThemes, shallow);

  const themeSettings: {
    id: string;
    name: string;
    title: string;
    current: { name: string };
    options: { name: string }[];
    onChange: (info: { name: string }) => void;
  }[] = [
    {
      id: 'doc_theme',
      name: 'Doc theme',
      title: 'Change document theme',
      current: { name: docTheme },
      options: docThemeOptions,
      onChange: info => configsActions.updaterc({ docTheme: info.name as typeof docTheme }),
    },
    {
      id: 'code_theme',
      name: 'Code theme',
      title: 'Change code theme',
      current: { name: codeTheme },
      options: codeThemeOptions,
      onChange: info => configsActions.updaterc({ codeTheme: info.name as typeof codeTheme }),
    },
  ];

  return (
    <div className={styles.container}>
      {themeSettings.map(setting => (
        <Fragment key={setting.id}>
          <label className={styles.label}>{setting.name}</label>
          <Selector
            title={setting.title}
            options={setting.options}
            uniqeBy='name'
            searchBy='name'
            containerClassName={styles.options}
            onChange={setting.onChange}
            currentSelected={setting.current}
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
        </Fragment>
      ))}
    </div>
  );
};
