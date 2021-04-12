import { motion } from 'framer-motion';
import { FileControlItem } from './types';
import { Markdown, dispatchAction } from '../../store/files';
import { GridButton } from '../UI';
import { Link, Download, Heart } from '../../assets/icons/essentials';
import styles from './styles.module.scss';

interface Props {
  files: Markdown[];
  onClick?: () => void;
}

export const MoreControls: React.FC<Props> = ({ files, onClick }) => {
  const controls: FileControlItem[] = [
    {
      id: 'manage_images',
      name: 'Manage Images',
      icon: <Heart />,
      disabled: files.length === 0,
      onClick: () => dispatchAction('manageImages', files),
    },
    {
      id: 'add_to_collection',
      name: 'Add to collection',
      icon: <Link />,
      disabled: files.length === 0,
      onClick: () => dispatchAction('addToCollection', files),
    },
    {
      id: 'export_file',
      name: 'Export',
      icon: <Download />,
      disabled: true,
      onClick: () => {},
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
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      exit={{ height: 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
      className={styles.morecontrols}
    >
      <div className={styles.controlbuttons}>{_controls}</div>
    </motion.div>
  );
};
