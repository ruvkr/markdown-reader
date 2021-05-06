import shallow from 'zustand/shallow';
import { createGlobalStyle, css } from 'styled-components';
import { useConfigsStore, ConfigsStore, Theme } from '../../store/configs';
import { createColorVariables } from './utils';

interface GlobalStyleProps {
  theme: Theme;
  docFont: string;
  docFontSize: number;
  docCodeFont: string;
  docCodeFontSize: number;
  docSerifFont: string;
  interfaceFont: string;
  interfaceFontSize: number;
}

const getConfigs = (state: ConfigsStore): GlobalStyleProps => ({
  theme: state.ac.theme,
  docFont: state.rc.font.name,
  docFontSize: state.rc.fontSize,
  docCodeFont: state.rc.codeFont.name,
  docCodeFontSize: state.rc.codeFontSize,
  docSerifFont: state.rc.serifFont.name,
  interfaceFont: state.ac.font.name,
  interfaceFontSize: state.ac.fontSize,
});

export const GlobalStyles: React.FC = () => {
  const styles = useConfigsStore(getConfigs, shallow);
  const colorVariables = createColorVariables(styles.theme);
  return <ScGlobalStyles {...styles} $colorVariables={colorVariables} />;
};

const ScGlobalStyles = createGlobalStyle<GlobalStyleProps & { $colorVariables: string }>(p => {
  return css`
    :root {
      ${p.$colorVariables}
      // fonts
      --app-font: '${p.interfaceFont}', sans-serif;
      --doc-font: '${p.docFont}', sans-serif;
      --doc-code-font: '${p.docCodeFont}', monospace;
      --doc-serif-font: '${p.docSerifFont}', serif;

      // font sizes
      --app-font-size: ${p.interfaceFontSize}px;
      --doc-font-size: ${p.docFontSize}px;
      --doc-code-font-size: ${p.docCodeFontSize}px;
    }
  `;
});
