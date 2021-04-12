import styled from 'styled-components';
import styles from './logov2.module.scss';

interface Props {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const LogoV2: React.FC<Props> = ({ size = 100, className, onClick }) => {
  return (
    <ScContainer $size={size} className={className} onClick={onClick}>
      <svg className={styles.svg} width='100%' height='100%' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <clipPath id='clipPath13'>
            <path d='m0 100 50-86.599 50 86.599h-100' />
          </clipPath>
        </defs>
        <path className={styles.border} d='m0 100 50-86.599 50 86.599h-100' clipPath='url(#clipPath13)' />
        <path d='m69.104 67.458c-2.1227-3.6766-4.2455-7.3533-6.3682-11.03-6.3681 11.03-12.736 22.06-19.104 33.09 4.2454-1.7e-5 8.4908-3.4e-5 12.736-5.1e-5l12.736-22.06z' />
        <path d='m18.159 89.518c4.2454 2.3e-5 8.4909 4.7e-5 12.736 7e-5 8.4908-14.707 16.982-29.413 25.472-44.12-2.1227-3.6766-4.2455-7.3532-6.3682-11.03-10.614 18.383-21.227 36.766-31.841 55.15z' />
        <path d='m81.841 89.518c-2.1227-3.6766-4.2454-7.3533-6.368-11.03-2.1227 3.6766-4.2454 7.3533-6.3682 11.03h12.736z' />
      </svg>
    </ScContainer>
  );
};

const ScContainer = styled.div<{ $size: number }>`
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
`;
