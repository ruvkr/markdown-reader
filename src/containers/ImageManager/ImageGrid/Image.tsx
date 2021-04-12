import clsx from 'clsx';
import { FileIcon, IconButton } from '../../../components/UI';
import { Trash } from '../../../assets/icons/essentials';
import { ImageDoc } from '../../../store/files';
import { ImageSourceMap } from '../../../store/image-manager';
import { CreateImage } from './CreateImage';
import styles from './image.module.scss';

interface Props {
  image: ImageDoc;
  sources: ImageSourceMap;
  listMode?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
}

export const Image: React.FC<Props> = ({
  image,
  sources,
  listMode = false,
  onClick,
  onRemove,
}) => {
  const removeHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onRemove && onRemove();
  };

  const source =
    image.id in sources
      ? sources[image.id]
      : image.type === 'absolute' || image.type === 'embedded'
      ? image.src
      : null;

  // prettier-ignore
  const icon = source
    ? <CreateImage src={source} />
    : <FileIcon format={getFileExtension(image.name)} />

  return (
    <div
      tabIndex={0}
      className={clsx(styles.image, listMode && styles.listview)}
      onClick={onClick}
    >
      <div tabIndex={-1} className={styles.focus}>
        <div className={styles.icon}>
          {image.type !== 'missing' && (
            <div className={styles.controls}>
              <IconButton icon={<Trash />} onClick={removeHandler} />
            </div>
          )}
          {icon}
        </div>
        <div className={styles.details}>
          <div className={styles.name}>{image.name}</div>
          <div className={styles.info}>{image.type}</div>
        </div>
      </div>
    </div>
  );
};

const getFileExtension = (name: string): string => {
  const index = name.lastIndexOf('.');
  return index > -1 ? name.substr(index + 1) : 'unknown';
};
