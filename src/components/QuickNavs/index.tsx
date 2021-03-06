import { useRef } from 'react';
import { Tabs } from '../UI';
import { QuickNavItem } from './types';
import { useHideOnReaderScroll } from './useHideOnReaderScroll';
import { QuickNavButton } from './QuickNavButton';
export * from './types';

interface Props {
  items: QuickNavItem[];
}

export const QuickNavs: React.FC<Props> = ({ items }) => {
  const isTabOpen = useRef(false);
  const show = useHideOnReaderScroll({
    initialDelay: 1,
    toggleOnClick: false,
    bottomLimit: 52,
    isTabOpen,
  });

  return (
    <Tabs
      show={show}
      tabItems={items.map(item => ({
        ...item,
        icon: props => <QuickNavButton {...props} size='2.5rem' icon={item.icon} />,
      }))}
      blockBackground
      title='Quick settings'
      setIsTabOpen={value => (isTabOpen.current = value)}
    />
  );
};
