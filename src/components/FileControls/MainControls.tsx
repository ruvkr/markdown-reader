import { motion } from 'framer-motion';
import { FileControlItem } from './types';
import { Markdown, dispatchAction } from '../../store/files';
import { GridButton } from '../UI';
import styles from './styles.module.scss';
import {
  Create,
  Trash,
  Information,
  Menu,
} from '../../assets/icons/essentials';

interface Props {
  expanded: boolean;
  files: Markdown[];
  onClick?: () => void;
  onMore?: () => void;
}

export const MainControls: React.FC<Props> = ({
  expanded,
  files,
  onClick,
  onMore,
}) => {
  const controls: FileControlItem[] = [
    {
      id: 'rename_file',
      name: 'Rename',
      icon: <Create />,
      disabled: files.length !== 1,
      onClick: () => dispatchAction('rename', files[0]),
    },
    {
      id: 'delete_file',
      name: 'Delete',
      icon: <Trash />,
      disabled: files.length === 0,
      onClick: () => dispatchAction('delete', files),
    },
    {
      id: 'about_file',
      name: 'Info',
      icon: <Information />,
      disabled: files.length === 0,
      onClick: () => dispatchAction('details', files),
    },
  ];

  const clickHandler = (item: FileControlItem) => {
    item.onClick && item.onClick();
    onClick && onClick();
  };

  const _controls = controls.map(item => (
    <GridButton
      key={item.id}
      icon={item.icon}
      name={item.name}
      disabled={item.disabled}
      onClick={() => clickHandler(item)}
    />
  ));

  return (
    <motion.div
      initial={{ height: expanded ? 0 : 'auto' }}
      animate={{ height: 'auto' }}
      exit={{ height: 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
      className={styles.maincontrols}
    >
      <div className={styles.controlbuttons}>
        {_controls}
        <GridButton icon={<Menu />} name='More' onClick={onMore} />
      </div>
    </motion.div>
  );
};
