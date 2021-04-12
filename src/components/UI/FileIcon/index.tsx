import clsx from 'clsx';
import {
  BmpIcon as Bmp,
  FileIcon as File,
  GifIcon as Gif,
  JpgIcon as Jpg,
  MdIcon as Md,
  PngIcon as Png,
  SvgIcon as Svg,
} from '../../../assets/icons/filetypes';
import styles from './styles.module.scss';

const Formats: { [type: string]: JSX.Element } = {
  bmp: <Bmp />,
  gif: <Gif />,
  jpg: <Jpg />,
  md: <Md />,
  png: <Png />,
  svg: <Svg />,
  unknown: <File />,
};

interface Props {
  format?: string;
  size?: number;
  onClick?: () => void;
  className?: string;
}

export const FileIcon: React.FC<Props> = ({
  format = 'unknown',
  size,
  onClick,
  className,
}) => {
  return (
    <div
      className={clsx(styles.fileicon, className)}
      style={{ width: size ?? '100%' }}
      onClick={onClick}
    >
      <div className={styles.icon}>{Formats[format] ?? Formats['unknown']}</div>
    </div>
  );
};
