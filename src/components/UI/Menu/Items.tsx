import { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { MenuItem, ControlItem } from './types';
import { ChevronForward } from '../../../assets/icons/essentials';
import { Controls } from './Controls';
import { BlockButton } from '../';
import styles from './items.module.scss';

interface Props {
  items: MenuItem[];
  onSubActive: (items: MenuItem[]) => void;
  controlItems: ControlItem[];
  getDelayDirection: React.MutableRefObject<1 | -1>;
  onClick: () => void;
}

export const Items: React.FC<Props> = ({
  items,
  onSubActive,
  controlItems,
  getDelayDirection,
  onClick,
}) => {
  const [play, setPlay] = useState(false);
  const fromTop = getDelayDirection.current === 1;
  useLayoutEffect(() => setPlay(true), []);

  const clickHandler = ({
    disabled,
    items,
    isSubMenu,
    onClick: itemOnClick,
  }: MenuItem) => () => {
    if (disabled) return;
    isSubMenu && items && items.length > 0 && onSubActive(items);
    !isSubMenu && itemOnClick && itemOnClick();
    !isSubMenu && onClick();
  };

  const _items = items.map((item, index) => (
    <ScBlockButton
      className={styles.item}
      icon={item.icon}
      badge={(item.isSubMenu && <ChevronForward />) || undefined}
      name={item.name}
      onClick={clickHandler(item)}
      disabled={item.disabled}
      key={item.id}
      $delay={fromTop ? index * 50 + 100 : (items.length - index) * 50 + 100}
    />
  ));

  return (
    <div className={styles.container}>
      <ScItems $play={play}>{_items}</ScItems>
      <Controls controls={controlItems} />
    </div>
  );
};

const ScItems = styled.div<{ $play: boolean }>`
  overflow: hidden;
  animation-play-state: ${p => (p.$play ? 'running' : 'paused')};
`;

const ScBlockButton = styled(BlockButton)<{ $delay: number }>`
  animation-delay: ${p => p.$delay}ms;
`;
