import { useRef } from 'react';
import styles from './styles.module.scss';
import { Markdown } from '../../../store/files';
import { Label } from '../../../components/UI';
import { useReadStore, ReadStore } from '../../../store/read';

interface DocInfoProps {
  file?: Markdown | null;
}

const getProgress = (state: ReadStore) => state.readProgress;

export const DocInfo: React.FC<DocInfoProps> = ({ file }) => {
  const progress = useReadStore(getProgress);
  const title = useRef(file ? file.name : '');
  const progressString = (progress * 100).toFixed(0) + '%';

  return (
    <Label title={title.current} className={styles.lebel}>
      <div
        className={styles.progress}
        style={{ '--progress': progress } as React.CSSProperties}
        title={`Read progress: ${progressString}`}>
        <span>{progressString}</span>
      </div>
    </Label>
  );
};
