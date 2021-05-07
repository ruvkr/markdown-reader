import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { match } from 'path-to-regexp';
import { Label } from '../../components/UI';
import { SettingItemI } from './types';
import { SettingItem } from './SettingItem';
import { settings } from './settings';
import { Container } from './Container';
import styles from './styles.module.scss';
import { useWindowResize, useLocation } from '../../hooks';
import { ConfigsStore, useConfigsStore } from '../../store/configs';

const getFontSize = (state: ConfigsStore) => state.ac.fontSize;

export const Settings: React.FC = () => {
  const [, forceUpdate] = useState({});
  const fontSize = useConfigsStore(getFontSize);

  // update on location pathname change
  useLocation();

  const isMobile = window.innerWidth < 45 * fontSize; // 45rem | 720px
  const activeItem = getActiveItem(isMobile);
  const activeItemRef = useRef(activeItem);

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

  // force update on window resize
  useWindowResize(() => forceUpdate({}));

  useEffect(() => {
    activeItemRef.current = activeItem;
  }, [activeItem]);

  useEffect(() => {
    if (isMobile && activeItemRef.current) {
      window.history.replaceState(null, '', getUrl());
    } else if (!isMobile && !activeItemRef.current) {
      window.history.replaceState(null, '', getUrl(settings[0].name));
    }
  }, [isMobile]);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <ScGrid $fontSize={fontSize}>
          <div className={styles.itemscontainer}>
            <Label title='Settings' className={styles.label} />
            <div className={styles.items}>{_settingItems}</div>
          </div>
          <Container fontSize={fontSize} isMobile={isMobile} opened={activeItem !== null} onClose={onClose}>
            <div className={styles.content}>
              <Content />
            </div>
          </Container>
        </ScGrid>
      </div>
    </div>
  );
};

const ScGrid = styled.div<{ $fontSize: number }>`
  width: 100%;
  height: 100%;
  display: grid;

  @media (min-width: ${p => p.$fontSize * 45}px) {
    grid-template-columns: 1fr 2fr;
  }

  @media (min-width: ${p => p.$fontSize * 75}px) {
    grid-template-columns: 23.75rem 2fr;
  }
`;

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
