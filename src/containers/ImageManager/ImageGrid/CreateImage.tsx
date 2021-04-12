import styled from 'styled-components';
import styles from './createimage.module.scss';

interface Props {
  src: string;
}

export const CreateImage: React.FC<Props> = ({ src }) => {
  return (
    <ScContainer $src={src} className={styles.container}>
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 56 56'
        fill='none'
        stroke='none'
      />
    </ScContainer>
  );
};

const ScContainer = styled.div<{ $src: string }>`
  background-image: ${p => `url("${p.$src}")`};
`;
