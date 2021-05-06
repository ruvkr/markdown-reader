import styled from 'styled-components';
import { SlideExit } from '../../components/UI';

interface Props {
  fontSize: number;
  isMobile: boolean;
  opened: boolean;
  onClose: () => void;
}

export const Container: React.FC<Props> = ({ fontSize, isMobile, opened, onClose, children }) => {
  if (isMobile) {
    return (
      <SlideExit opened={opened} onClose={onClose} handleBack={false}>
        <ScMobileContainer $breakpoint={45 * fontSize}>{children}</ScMobileContainer>
      </SlideExit>
    );
  } else return <ScDesktopContainer $breakpoint={45 * fontSize}>{children}</ScDesktopContainer>;
};

const ScMobileContainer = styled.div<{ $breakpoint: number }>`
  width: 100%;
  height: 100%;
  overflow: auto;
  @media (min-width: ${p => p.$breakpoint}px) {
    display: none;
  }
`;

const ScDesktopContainer = styled.div<{ $breakpoint: number }>`
  overflow: auto;
  margin-top: 3.25rem;
  @media (max-width: ${p => p.$breakpoint - 1}px) {
    display: none;
  }
`;
