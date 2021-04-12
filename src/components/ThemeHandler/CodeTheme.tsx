import { createPortal } from 'react-dom';
import codeThemes from '../../assets/styles/codeThemes';
import { useConfigsStore, ConfigsStore } from '../../store/configs';

const getTheme = (state: ConfigsStore) => state.rc.codeTheme;

export const CodeTheme: React.FC = () => {
  const theme = useConfigsStore(getTheme);
  
  return createPortal(
    <link rel='stylesheet' href={codeThemes[theme]}></link>,
    document.head
  );
};
