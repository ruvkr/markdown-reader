import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props {
  listMode?: boolean;
  selectionMode?: boolean;
  selected?: boolean;
  image: JSX.Element;
  name: string;
  info?: string;
  badge?: JSX.Element;
  progress?: number;
  className?: string;
  onClick?: () => void;
  onSelect?: () => void;
  onContextMenu?: () => void;
}

export const FileView: React.FC<Props> = ({
  listMode = false,
  selectionMode = false,
  selected = false,
  image,
  name,
  info,
  badge,
  progress = 0,
  className,
  onClick,
  onSelect,
  onContextMenu,
}) => {
  const clickHandler = () => {
    if (selectionMode) onSelect && onSelect();
    else onClick && onClick();
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!onContextMenu) return;
    event.preventDefault();
    onContextMenu();
  };

  return (
    <div
      tabIndex={0}
      onClick={clickHandler}
      onContextMenu={handleContextMenu}
      title={name}
      className={clsx(className, styles.fileview, listMode && styles.listview, selected && styles.selected)}>
      <div tabIndex={-1} className={styles.focus}>
        {selectionMode && <div className={styles.mark} />}
        <div className={styles.icon}>{image}</div>
        <div className={styles.details}>
          <div className={styles.name}>{name}</div>
          <div className={styles.info}>{info}</div>
        </div>
      </div>
    </div>
  );
};
