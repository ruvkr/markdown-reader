import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import shallow from 'zustand/shallow';
import styles from './styles.module.scss';
import { useUiStore, UiStore, viewActions } from '../../store/ui';
import { crud } from '../../store/files';
import { NavItemI } from './types';
import { NavItem } from './NavItem';
import { AddButton } from './AddButton';
import { Home, Settings, Bookmarks, Expand, Library } from '../../assets/icons/essentials';

const navs: NavItemI[] = [
  { id: uuid(), to: '/', name: 'home', title: 'Home', icon: <Home /> },
  { id: uuid(), to: '/files', name: 'files', title: 'Files', icon: <Library /> },
  { id: uuid(), to: '/highlights', name: 'highlights', title: 'Highlights', icon: <Bookmarks /> },
  { id: uuid(), to: '/settings', name: 'settings', title: 'Settings', icon: <Settings /> },
];

const getStore = (state: UiStore) => ({
  view: state.view,
  fullScreen: state.fullScreen,
  isEmpty: state.isEmpty,
});

export const Navs: React.FC = () => {
  const { view, fullScreen, isEmpty } = useUiStore(getStore, shallow);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const clickInput = () => inputRef.current && inputRef.current.click();
  const fileAddHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files && Array.from(event.target.files);
    selectedFiles && crud.add(selectedFiles);
    event.target.value = '';
  };

  const _navs = navs.map(nav => (
    <NavItem
      key={nav.id}
      title={nav.title}
      icon={nav.icon}
      active={nav.name === view}
      onClick={() => window.history.pushState(undefined, '', nav.to)}
    />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.hidden}>
        <input type='file' multiple hidden ref={inputRef} onChange={fileAddHandler} />
      </div>

      <div className={styles.navs}>
        <NavItem
          title='Full Screen'
          icon={<Expand />}
          onClick={() => viewActions.toggleFs(!fullScreen)}
          active={fullScreen}
        />
        <div className={styles.views}>{_navs}</div>
        <AddButton active={isEmpty} onClick={clickInput} />
      </div>
    </div>
  );
};
