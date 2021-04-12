import clsx from 'clsx';
import { Markdown } from '../../store/files';
import { Close } from '../../assets/icons/essentials';
import { Button, IconButton } from '../UI';
import styles from './styles.module.scss';

interface Props {
  selectionMode: boolean;
  files: Markdown[];
  onClick?: () => void;
  onClose?: () => void;
}

export const Heading: React.FC<Props> = ({
  selectionMode: sm,
  files,
  onClick,
  onClose,
}) => {
  const heading = getFilesCount(sm, files);
  return (
    <div className={clsx(styles.heading, sm && styles.selectionmode)}>
      {!sm && <div className={styles.label}>{heading}</div>}
      {sm && <Button name={heading} onClick={onClick} />}
      {sm && <IconButton icon={<Close />} onClick={onClose} />}
    </div>
  );
};

const getFilesCount = (selectionMode: boolean, files: Markdown[]): string => {
  const count = files.length;
  return selectionMode
    ? `${count} file${count > 1 ? 's' : ''} selected`
    : files[0].name;
};
