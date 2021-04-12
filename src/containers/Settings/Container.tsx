import { SlideExit } from '../../components/UI';
import styles from './container.module.scss';

interface Props {
  isMobile: boolean;
  opened: boolean;
  onClose: () => void;
}

export const Container: React.FC<Props> = ({
  isMobile,
  opened,
  onClose,
  children,
}) => {
  if (isMobile) {
    return (
      <SlideExit opened={opened} onClose={onClose} handleBack={false}>
        <div className={styles.mobile}>{children}</div>
      </SlideExit>
    );
  } else return <div className={styles.desktop}>{children}</div>;
};
