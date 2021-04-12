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
  docSerifFontSize: number;
  interfaceFont: string;
  interfaceFontSize: number;
  interfaceSerifFont: string;
  interfaceSerifFontSize: number;
}

const getConfigs = (state: ConfigsStore): GlobalStyleProps => ({
  theme: state.ac.theme,
  docFont: state.rc.font.name,
  docFontSize: state.rc.fontSize,
  docCodeFont: state.rc.codeFont.name,
  docCodeFontSize: state.rc.codeFontSize,
  docSerifFont: state.rc.serifFont.name,
  docSerifFontSize: state.rc.serifFontSize,
  interfaceFont: state.ac.font.name,
  interfaceFontSize: state.ac.fontSize,
  interfaceSerifFont: state.ac.serifFont.name,
  interfaceSerifFontSize: state.ac.serifFontSize,
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
      --app-serif-font: '${p.interfaceSerifFont}', serif;
      --doc-font: '${p.docFont}', sans-serif;
      --doc-code-font: '${p.docCodeFont}', monospace;
      --doc-serif-font: '${p.docSerifFont}', serif;

      // font sizes
      --app-font-size: 14px;
      --app-serif-font-size: 14px;
      --doc-font-size: 14px;
      --doc-code-font-size: 14px;
      --doc-serif-font-size: 14px;
    }
  `;
});
