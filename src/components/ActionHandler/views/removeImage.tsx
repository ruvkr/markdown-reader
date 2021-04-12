import { useState } from 'react';
import clsx from 'clsx';
import styles from './delete.module.scss';
import { HandlerFunction } from '../types';
import { ControlItem, Checkbox } from '../../UI';
import {
  Checkmark,
  ChevronBack,
  Trash,
} from '../../../assets/icons/essentials';

export const removeImageHandler: HandlerFunction<'removeImage'> = ({
  action,
  confirm,
  cancel,
}) => {
  let neverAsk = false;

  const controls: ControlItem[] = [
    {
      id: 'confirm-remove',
      name: 'Remove',
      icon: <Checkmark />,
      onClick: () => confirm({ id: action.id, neverAsk }),
    },
    {
      id: 'cancel-action',
      name: 'Cancel',
      icon: <ChevronBack />,
      onClick: cancel,
    },
  ];

  const title = `Remove ${action.info.name}`;
  const message = `${action.info.name} will be removed. Confirm action?`;

  const Content: React.FC = () => {
    const [na, setNeverAsk] = useState(false);

    const onChangeHandler = (value: boolean) => {
      setNeverAsk(value);
      neverAsk = value;
    };

    return (
      <div className={styles.container}>
        <div children={<Trash />} className={styles.icon} />
        <div className={styles.details}>
          <div className={styles.message}>{message}</div>
          <div className={styles.neverask}>
            <Checkbox checked={na} onChange={onChangeHandler} />
            <div className={clsx(styles.message, na && styles.checked)}>
              Never ask again
            </div>
          </div>
        </div>
      </div>
    );
  };

  return { controls, title, Content };
};
