import { useState } from 'react';
import styles from './replaceImage.module.scss';
import { HandlerFunction } from '../types';
import { ControlItem, Checkbox } from '../../UI';
import { ImageConflict } from '../../../store/image-manager';
import { ChevronBack, Refresh } from '../../../assets/icons/essentials';

export const replaceImageHandler: HandlerFunction<'replaceImages'> = ({
  action,
  confirm,
  cancel,
}) => {
  let resolvedConflicts = action.conflicts;
  const conflicts = Object.values(action.conflicts);

  const controls: ControlItem[] = [
    {
      id: 'confirm-replace',
      name: 'Replace',
      icon: <Refresh />,
      onClick: () => confirm({ id: action.id, resolved: resolvedConflicts }),
    },
    {
      id: 'cancel-action',
      name: 'Cancel',
      icon: <ChevronBack />,
      onClick: cancel,
    },
  ];

  const title = 'Replace existing images?';

  const Content: React.FC = () => {
    const [resolved, setResolved] = useState(action.conflicts);

    const selectHandler = (item: ImageConflict) => () => {
      const newResolved = { ...resolved };
      if (item.doc.id in newResolved) delete newResolved[item.doc.id];
      else newResolved[item.doc.id] = item;
      resolvedConflicts = newResolved;
      setResolved(newResolved);
    };

    const items = conflicts.map(item => (
      <div
        key={item.doc.id}
        tabIndex={-1}
        onClick={selectHandler(item)}
        className={styles.item}
      >
        <div tabIndex={-1} className={styles.foucs}>
          <Checkbox checked={item.doc.id in resolved} />
          <div className={styles.name}>{item.doc.name}</div>
        </div>
      </div>
    ));

    return (
      <div className={styles.container}>
        <div className={styles.label}>Conflicts</div>
        <div className={styles.items}>{items}</div>
      </div>
    );
  };

  return { controls, title, Content };
};
