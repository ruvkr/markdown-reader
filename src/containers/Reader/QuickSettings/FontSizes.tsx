import styled from 'styled-components';
import styles from './styles.module.scss';
import { ReaderFontSizer } from '../../Settings/views/Fonts/ReaderFontSizer';
import { ConfigsStore, useConfigsStore } from '../../../store/configs';

const getFontSize = (state: ConfigsStore) => state.ac.fontSize;

export const FontSizes: React.FC = () => {
  const fontSize = useConfigsStore(getFontSize);

  return (
    <ScContainer $fontSize={fontSize} className={styles.sizescontainer}>
      <ReaderFontSizer />
    </ScContainer>
  );
};

const ScContainer = styled.div<{ $fontSize: number }>` // 720px | 45rem
  @media (min-width: ${p => p.$fontSize * 45}px) {
    grid-template-columns: 1fr 1fr;
  }
`;
