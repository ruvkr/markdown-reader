import styles from './toggler.module.scss';
import { Text, Resize } from '../../assets/icons/essentials';
import { Font } from '../../store/configs';

interface Props {
  currentFont: Font;
  currentFontSize: number;
  onClick?: () => void;
}

export const Toggler: React.FC<Props> = ({
  currentFont,
  currentFontSize,
  onClick,
}) => {
  return (
    <button className={styles.toggler} onClick={onClick}>
      <div className={styles.focus} tabIndex={-1}>
        <Text className={styles.icon} />
        <div className={styles.name}>{currentFont.name}</div>
        <Resize className={styles.icon} />
        <div className={styles.name}>{currentFontSize + 'px'}</div>
      </div>
    </button>
  );
};
