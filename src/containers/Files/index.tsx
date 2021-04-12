import styles from './styles.module.scss';
import { FileGrid } from '../../components/FileGrid';
import { useUiStore, UiStore } from '../../store/ui';
import { Empty } from '../../components/UI';
import { AddCircle, Document } from '../../assets/icons/essentials';

const getIsEmpty = (store: UiStore) => store.isEmpty;

export const Files: React.FC = () => {
  const isEmpty = useUiStore(getIsEmpty);

  if (isEmpty) {
    return (
      <Empty
        icon={<Document />}
        heading='Files will appear here'
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
      <FileGrid />
    </div>
  );
};
