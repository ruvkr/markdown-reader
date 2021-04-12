import styles from './highlightitem.module.scss';

interface Props {
  text: string;
  note?: string;
  onClick?: () => void;
}

export const HighlightItem: React.FC<Props> = ({ text, note, onClick }) => {
  return (
    <button onClick={onClick} className={styles.item}>
      <div tabIndex={-1} className={styles.focus}>
        <div className={styles.text}>{text}</div>
      </div>
    </button>
  );
};
