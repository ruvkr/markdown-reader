import styled from 'styled-components';
import styles from './logov1.module.scss';

interface Props {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const LogoV1: React.FC<Props> = ({ size = 100, className, onClick }) => {
  return (
    <ScContainer $size={size} className={className} onClick={onClick}>
      <svg className={styles.svg} viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
        <path className={styles.m} d='M23 35.1719V65H27V44.8281L37 54.8281L47 44.8281V65H51V35.1719L37 49.1719L23 35.1719Z' />
        <path className={styles.arrow} d='M65 36V53.0352L55 53L67 65L78.9141 53.0859L69 53.0508V36H65ZM78.9141 53.0859H79V53L78.9141 53.0859Z' />
        <polygon className={styles.border} points='0,0 0,100 100,100 100,0' />
      </svg>
    </ScContainer>
  );
};

const ScContainer = styled.div<{ $size: number }>`
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
`;
