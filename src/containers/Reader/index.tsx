import { useMemo, useRef } from 'react';
import { ChevronBack, ArrowUp, ColorPalette, Text, Resize } from '../../assets/icons/essentials';
import { QuickNavs, QuickNavItem } from '../../components/QuickNavs';
import { Hightlight } from '../../components/Hightlight';
import { SlideExit } from '../../components/UI';
import { useReadStore, ReadStore, readActions } from '../../store/read';
import { CreateDoc } from './CreateDoc';
import { Themes } from './QuickSettings/Themes';
import { Fonts } from './QuickSettings/Fonts';
import { FontSizes } from './QuickSettings/FontSizes';
export * from './types';

const getFile = (state: ReadStore) => state.read;

export const Reader: React.FC = () => {
  const info = useReadStore(getFile);
  const setScrollRef = useRef<(to: string | number) => void>();

  const quickNavs: QuickNavItem[] = useMemo(() => {
    return [
      {
        id: 'themes',
        title: 'Themes',
        icon: <ColorPalette />,
        content: <Themes />,
      },
      {
        id: 'fonts',
        title: 'Fonts',
        icon: <Text />,
        content: <Fonts />,
      },
      {
        id: 'font-sizes',
        title: 'Font sizes',
        icon: <Resize />,
        content: <FontSizes />,
      },
      {
        id: 'gototop',
        title: 'Go top',
        icon: <ArrowUp />,
        isButton: true,
        onClick: () => setScrollRef.current && setScrollRef.current(0),
      },
      {
        id: 'back',
        title: 'Back',
        icon: <ChevronBack />,
        isButton: true,
        onClick: readActions.dismiss,
      },
    ];
  }, []);

  return (
    <SlideExit opened={info !== null} onClose={readActions.dismiss} startRange={getStartRange}>
      <CreateDoc file={info?.file} highlight={info?.highlight} forwardSetScroll={setScrollRef} />
      <QuickNavs items={quickNavs} />
      <Hightlight highlights={info?.file.highlights} />
    </SlideExit>
  );
};

const getStartRange = (width: number): number => {
  return Math.min(0.1 * width, 64);
};
