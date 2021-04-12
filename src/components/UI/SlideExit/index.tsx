import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBackHandler } from '../../../hooks';
import { Container } from './Container';

interface Props {
  onOpen?: () => void;
  onClose?: () => void;
  startRange?: (width: number) => number;
  opened?: boolean;
  handleBack?: boolean;
}

export const SlideExit: React.FC<Props> = ({
  opened = false,
  onOpen,
  onClose,
  startRange,
  children,
  handleBack = true,
}) => {
  const [mount, setMount] = useState(false);

  // handle back button
  useBackHandler({ handle: handleBack && opened, onBack: onClose });

  const onCloseHandler = () => {
    mount && setMount(false);
    onClose && onClose();
  };

  useEffect(() => {
    if (!opened) return;
    const timeout = window.setTimeout(() => setMount(true));
    return () => window.clearTimeout(timeout);
  }, [opened]);

  return createPortal(
    mount && (
      <Container
        opened={opened}
        onOpen={onOpen}
        onClose={onCloseHandler}
        startRange={startRange}
        children={children}
      />
    ),
    document.getElementById('containers') as HTMLElement
  );
};
