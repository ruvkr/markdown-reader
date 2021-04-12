import { useState } from 'react';
import { HandlerFunction } from '../types';
import { ControlItem, Input, ControlButtons } from '../../UI';
import { Checkmark, ChevronBack } from '../../../assets/icons/essentials';
import styles from './rename.module.scss';

export const renameHandler: HandlerFunction<'rename'> = ({
  action,
  cancel,
  confirm,
}) => {
  const Content: React.FC = () => {
    const [name, setName] = useState(action.file.name);
    const invalid = name.trim() === '';

    const controls: ControlItem[] = [
      {
        id: 'confirm-rename',
        name: 'Rename',
        icon: <Checkmark />,
        disabled: invalid,
        onClick: () => confirm({ id: action.id, newName: name.trim() }),
      },
      {
        id: 'cancel-action',
        name: 'Cancel',
        icon: <ChevronBack />,
        onClick: cancel,
      },
    ];

    return (
      <div className={styles.container}>
        <div className={styles.body}>
          <label className={styles.label}>Enter new name</label>
          <Input
            value={name}
            onChange={setName}
            focus
            select
            invalid={invalid}
          />
        </div>
        <ControlButtons controls={controls} />
      </div>
    );
  };

  return {
    title: 'Rename file',
    Content,
  };
};
