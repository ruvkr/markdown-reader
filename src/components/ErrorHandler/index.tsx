import { useErrorStore, ErrorStore, errorActions } from '../../store/error';
import { Modal } from '../UI';
import { ChevronBack, CloseCircle } from '../../assets/icons/essentials';
import styles from './styles.module.scss';

const getError = (state: ErrorStore) => state.errors;

export const ErrorHandler: React.FC = () => {
  const errors = useErrorStore(getError);
  const error = errors && errors.length > 0 ? errors[0] : null;
  const closeHandler = () => error && errorActions.dismiss(error.id);

  return (
    <Modal
      show={error !== null}
      close={closeHandler}
      title={error ? error.title : 'Error'}
      onClose={closeHandler}
      controls={[
        {
          id: 'dissmiss-error',
          name: 'Dismiss',
          icon: <ChevronBack />,
          onClick: closeHandler,
        },
      ]}>
      <div className={styles.container}>
        <div className={styles.icon} children={<CloseCircle />} />
        <div className={styles.message}>{error ? error.message : 'Somthing went wrong'}</div>
      </div>
    </Modal>
  );
};
