import styles from './spinner.module.scss';

interface Props {
  className?: string;
}

export const Spinner: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dot_0} />
      <div className={styles.dot_1} />
      <div className={styles.dot_3} />
      <div className={styles.dot_2} />
    </div>
  );
};
