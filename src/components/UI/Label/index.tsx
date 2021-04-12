import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props {
  title: string;
  className?: string;
}

export const Label: React.FC<Props> = ({ title, className, children }) => {
  return (
    <div className={clsx(styles.label, className)}>
      <label className={styles.title}>{title}</label>
      <div className={styles.controls}>{children}</div>
    </div>
  );
};
