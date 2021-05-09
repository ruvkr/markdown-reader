import { createPortal } from 'react-dom';
import docThemes from '../../assets/styles/docThemes';
import '../../assets/styles/docThemes/base.scss';
import { useConfigsStore, ConfigsStore } from '../../store/configs';
// import '../../assets/styles/docThemes/themes/default.scss'; // default
// import '../../assets/styles/docThemes/themes/drake.scss';  // drake

const getTheme = (state: ConfigsStore) => state.rc.docTheme;

export const DocTheme = () => {
  const theme = useConfigsStore(getTheme);
  return createPortal(<link rel='stylesheet' href={docThemes[theme]}></link>, document.head);
  // return null;
};