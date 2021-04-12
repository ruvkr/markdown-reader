import styles from './styles.module.scss';
import { useFileStore, FileStore } from '../../store/files';
import { readActions } from '../../store/read';
import { Label, Empty } from '../../components/UI';
import { HighlightItem } from './HighlightItem';
import { ColorWand, Reader } from '../../assets/icons/essentials';

const getHighlights = (store: FileStore) => store.highlights;

export const Highlights: React.FC = () => {
  const highlights = useFileStore(getHighlights);

  if (!highlights) {
    return (
      <Empty
        icon={<Reader />}
        heading='Highlights will appear here'
        description={
          <p className={styles.desciption}>
            <span>To highlight, select text in reader and click</span>
            <ColorWand className={styles.highlighticon} />
            <span>on bottom</span>
          </p>
        }
      />
    );
  }

  const _highlights = highlights.map(item => (
    <div key={item.file._id} className={styles.itemscontainer}>
      {/* label */}
      <div className={styles.heading}>
        <label className={styles.name}>{item.file.name}</label>
        <div className={styles.count}>{item.highlights.length}</div>
      </div>

      {/* highlights */}
      <div className={styles.grid}>
        {item.highlights.map(highlight => (
          <HighlightItem
            key={highlight.id}
            text={highlight.text}
            note={highlight.note}
            onClick={() => readActions.read(item.file, highlight.id)}
          />
        ))}
      </div>
    </div>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.itemscontainer}>
        <Label title='Highlights' className={styles.label} />
        <div className={styles.itemscontainer}>{_highlights}</div>
      </div>
    </div>
  );
};
