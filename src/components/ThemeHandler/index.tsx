import { GlobalStyles } from './GlobalStyles';
import { CodeTheme } from './CodeTheme';
import { DocTheme } from './DocTheme';
import { FontsLoader } from './FontsLoader';

export const ThemeHandler: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <CodeTheme />
      <DocTheme />
      <FontsLoader />
    </>
  );
};
