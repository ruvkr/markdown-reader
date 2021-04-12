import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import styles from './styles.module.scss';
import { useAlertStore, notificationAlert, AlertStore } from '../../store/alert';
import { Notification } from './Notification';

const getNotifications = (state: AlertStore) => state.notifications;

export const NotificationHandler: React.FC = () => {
  const forceUpdate = useState<{}>()[1].bind(null, {});
  const notifs = useAlertStore(getNotifications);
  const mount = useRef(false);
  notifs.length > 0 && (mount.current = true);

  const unMountHandler = () => {
    if (notifs.length > 0) return;
    mount.current = false;
    forceUpdate();
  };

  const _notifs = notifs.map(notif => (
    <Notification
      type={notif.type}
      message={notif.message}
      key={notif.id}
      onClear={() => notificationAlert.clear(notif.id)}
    />
  ));

  return createPortal(
    mount.current && (
      <div className={styles.container}>
        <AnimatePresence onExitComplete={unMountHandler}>{_notifs}</AnimatePresence>
      </div>
    ),
    document.getElementById('notifs') as HTMLElement
  );
};
