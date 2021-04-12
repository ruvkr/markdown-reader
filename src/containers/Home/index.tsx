import shallow from 'zustand/shallow';
import { useFileStore, FileStore } from '../../store/files';
import { FileSlider } from '../../components/FileSlider';
import { Empty } from '../../components/UI';
import styles from './styles.module.scss';
import { AddCircle, CloudyNight } from '../../assets/icons/essentials';

const getFiles = (state: FileStore) => ({
  recentlyAdded: state.recentlyAdded,
  recentlyOpened: state.recentlyOpened,
});

export const Home = () => {
  const { recentlyAdded, recentlyOpened } = useFileStore(getFiles, shallow);
  const gotoFiles = () => window.history.pushState(undefined, '', '/files');
  const isEmpty = !recentlyAdded && !recentlyOpened;

  if (isEmpty) {
    return (
      <Empty
        icon={<CloudyNight />}
        heading='Nothing to show'
        description={
          <p className={styles.desciption}>
            <span>Too add files click</span>
            <AddCircle className={styles.plusicon} />
            <span>icon on bottom right</span>
          </p>
        }
      />
    );
  }

  return (
    <div className={styles.container}>
      {recentlyOpened && (
        <FileSlider
          title='Recently opened'
          info='lastOpened'
          files={recentlyOpened}
          more='All files'
          onMoreClick={gotoFiles}
        />
      )}

      {recentlyAdded && (
        <FileSlider
          title='Recently added'
          files={recentlyAdded}
          info='created'
          more='All files'
          onMoreClick={gotoFiles}
        />
      )}
    </div>
  );
};
