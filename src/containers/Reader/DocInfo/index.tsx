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
  const radius = 16;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference * (1 - (progress ?? 0));

  return (
    <Label title={title.current} className={styles.lebel}>
      <div className={styles.progress}>
        <svg
          height='36'
          width='36'
          viewBox='0 0 36 36'
          fill='none'
          style={{ '--dasharray': circumference, '--offset': offset } as React.CSSProperties}>
          <circle className={styles.progressringbg} strokeWidth='2' fill='transparent' r={radius} cx='18' cy='18' />
          <circle className={styles.progressring} strokeWidth='2' fill='transparent' r={radius} cx='18' cy='18' />
        </svg>
      </div>
    </Label>
  );
};
