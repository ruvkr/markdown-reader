import { useEffect, useRef } from 'react';
import shallow from 'zustand/shallow';
import { Grid } from './Grid';
import styles from './imagegrid.module.scss';
import {
  useImageManagerStore,
  ImageManagerStore,
  imActions,
} from '../../../store/image-manager';

interface Props {
  listMode?: boolean;
}

const getState = (state: ImageManagerStore) => ({
  sources: state.sources,
  files: state.files,
});

export const ImageGrid: React.FC<Props> = ({ listMode: lm = true }) => {
  const { sources, files } = useImageManagerStore(getState, shallow);
  const inputRef = useRef<HTMLInputElement>(null);
  const info = useRef<[string, string] | null>(null);

  const clickInput = (fileID: string, imageID: string) => {
    info.current = [fileID, imageID];
    if (!inputRef.current) return;
    inputRef.current.value = '';
    inputRef.current.click();
  };

  const fileAddHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files && Array.from(event.target.files);
    if (!selectedFiles || selectedFiles.length === 0) return;
    if (!info.current) return;
    imActions.addOne(...info.current, selectedFiles[0]);
  };

  const grids =
    files && sources
      ? files.map(file => (
          <Grid
            key={file._id}
            file={file}
            sources={sources}
            listMode={lm}
            onClick={clickInput}
            onRemove={imActions.delete}
          />
        ))
      : null;

  useEffect(() => {
    const timeout = window.setTimeout(imActions.loadSources, 500);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.hidden}>
        <input type='file' hidden ref={inputRef} onChange={fileAddHandler} />
      </div>
      {grids}
    </div>
  );
};
