import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import { Notification as NotificationT } from '../../store/alert';
import styles from './notification.module.scss';
import { Spinner, IconButton } from '../UI';
import { Close, InformationCircle, AlertCircle, CheckmarkCircle } from '../../assets/icons/essentials';

interface Props {
  type: NotificationT['type'];
  message: string;
  onClear?: () => void;
}

const icons: { [key in NotificationT['type']]: JSX.Element } = {
  info: <InformationCircle className={styles.info} />,
  error: <AlertCircle className={styles.error} />,
  success: <CheckmarkCircle className={styles.success} />,
  wait: <Spinner />,
};

export const Notification: React.FC<Props> = ({ type, message, onClear }) => {
  return (
    <motion.div variants={variants} initial='initial' animate='animate' exit='exit' className={styles.motioncontainer}>
      <div className={styles.container}>
        <div className={styles.notif}>
          <div className={styles.icon}>{icons[type]}</div>
          <div className={styles.message}>{message}</div>
          <ScIconButton icon={<Close />} onClick={onClear} />
        </div>
      </div>
    </motion.div>
  );
};

const variants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { type: 'tween', duration: 0.3 },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { type: 'tween', duration: 0.3, delay: 0.3 },
      opacity: { type: 'tween', duration: 0.3 },
    },
  },
};

const ScIconButton = styled(IconButton)`
  border-radius: 0;
`;
