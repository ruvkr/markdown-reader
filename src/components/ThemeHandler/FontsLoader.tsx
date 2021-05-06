import { createPortal } from 'react-dom';
import shallow from 'zustand/shallow';
import { useConfigsStore, ConfigsStore, Font } from '../../store/configs';
import { createLink } from './utils';

const getFonts = (state: ConfigsStore): Font[] => [
  state.rc.font,
  state.rc.codeFont,
  state.rc.serifFont,
  state.ac.font,
];

export const FontsLoader: React.FC = () => {
  const fonts = useConfigsStore(getFonts, shallow);
  const familyNames = createLink(fonts);
  const href = `https://fonts.googleapis.com/css2?${familyNames}&display=swap`;

  return createPortal(
    <>
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link href={href} rel='stylesheet' />
    </>,
    document.head
  );
};
