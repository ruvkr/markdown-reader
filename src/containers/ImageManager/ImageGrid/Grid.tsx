import clsx from 'clsx';
import { Markdown } from '../../../store/files';
import { ImageSourceMap } from '../../../store/image-manager';
import { Image } from './Image';
import styles from './imagegrid.module.scss';

interface Props {
  file: Markdown;
  sources: ImageSourceMap;
  listMode?: boolean;
  onClick?: (fileID: string, imageID: string) => void;
  onRemove?: (fileID: string, imageID: string) => void;
}

export const Grid: React.FC<Props> = ({
  file,
  sources,
  listMode = false,
  onClick,
  onRemove,
}) => {
  const images = file.imageList.map(image => (
    <Image
      key={image.id}
      image={image}
      sources={sources}
      listMode={listMode}
      onClick={() => onClick && onClick(file._id, image.id)}
      onRemove={() => onRemove && onRemove(file._id, image.id)}
    />
  ));

  return (
    <div className={clsx(styles.gridcontainer, listMode && styles.listview)}>
      <div className={styles.heading}>
        <label className={styles.name}>{file.name}</label>
        <label className={styles.count}>20 / 25</label>
      </div>
      <div className={styles.grid}>{images}</div>
    </div>
  );
};
