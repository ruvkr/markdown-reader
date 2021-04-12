import styled, { css } from 'styled-components';
import { IconButton, IconButtonProps, TabItem, Tabs, iconButtonClasses as ibc } from '../UI';
import { QuickNavItem } from './types';
import { useHideOnReaderScroll } from './useHideOnReaderScroll';
export * from './types';

interface Props {
  items: QuickNavItem[];
}

export const QuickNavs: React.FC<Props> = ({ items }) => {
  const show = useHideOnReaderScroll({
    initialDelay: 1,
    toggleOnClick: false,
    bottomLimit: 52,
  });

  const tabs: TabItem[] = items.map(item => ({
    ...item,
    icon: props => <Icon {...props} size={40} icon={item.icon} />,
  }));

  return <Tabs show={show} tabItems={tabs} blockBackground />;
};

type IconProps = IconButtonProps & { active: boolean };
export const Icon: React.FC<IconProps> = ({ active, ...rest }) => <ScIconButton $active={active} {...rest} />;

const ScIconButton = styled(IconButton)<{ $active: boolean }>(p => {
  return (
    p.$active &&
    css`
      .${ibc.icon} {
        background-color: var(--accent);
        color: var(--card);
        fill: var(--card);
        stroke: var(--card);
        transition: all 300ms ease-in-out;
      }

      &:focus,
      &:active {
        outline: none;
        .${ibc.focus} {
          background-color: transparent;
          filter: brightness(120%);
          transition: all 300ms ease-in-out;
        }
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover:not(:disabled) {
          .${ibc.focus} {
            background-color: transparent;
            filter: brightness(120%);
            transition: all 300ms ease-in-out;
          }
        }
      }
    `
  );
});
