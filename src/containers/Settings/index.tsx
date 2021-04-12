import { useState } from 'react';
import { match } from 'path-to-regexp';
import { Label } from '../../components/UI';
import { SettingItemI } from './types';
import { SettingItem } from './SettingItem';
import { settings } from './settings';
import { Container } from './Container';
import styles from './styles.module.scss';
import { useWindowResize, useLocation } from '../../hooks';

export const Settings: React.FC = () => {
  // update on location pathname change
  useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const activeItem = getActiveItem(isMobile);

  // content to render
  const Content: React.ComponentType = activeItem?.content || (() => null);

  // mobile slide close handler
  const onClose = () => {
    if (activeItem !== null) {
      window.history.replaceState(null, '', getUrl());
    }
  };

  // handle click on setting items menu
  const clickHandler = (item: SettingItemI) => () => {
    const url = getUrl(item.name);
    if (isMobile) window.history.pushState(null, '', url);
    else window.history.replaceState(null, '', url);
  };

  const _settingItems = settings.map(item => (
    <SettingItem
      key={item.id}
      name={item.name}
      title={item.title}
      icon={item.icon}
      info={item.info}
      active={(activeItem && activeItem.id === item.id) || false}
      onClick={clickHandler(item)}
    />
  ));

  useWindowResize(() => {
    const _isMobile = window.innerWidth < 720;
    if (isMobile === _isMobile) return;
    setIsMobile(_isMobile);

    // replace route
    if (_isMobile && activeItem) {
      window.history.replaceState(null, '', getUrl());
    } else if (!_isMobile && !activeItem) {
      window.history.replaceState(null, '', getUrl(settings[0].name));
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.grid}>
          <div className={styles.itemscontainer}>
            <Label title='Settings' className={styles.label} />
            <div className={styles.items}>{_settingItems}</div>
          </div>
          <Container isMobile={isMobile} opened={activeItem !== null} onClose={onClose}>
            <div className={styles.content}>
              <Content />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

const matchFunc = match<{ type?: string }>('/settings/:type?');

const getActiveItem = (isMobile: boolean): SettingItemI | null => {
  const matchResult = matchFunc(window.location.pathname);
  const fallback = isMobile ? null : settings[0];
  if (!matchResult) return fallback;
  const result = settings.find(item => item.name === matchResult.params.type);
  return result || fallback;
};

const getUrl = (type?: string) => {
  const sub = type ? '/' + encodeURI(type) : '';
  return '/settings' + sub;
};
