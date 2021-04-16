import clsx from 'clsx';
import styles from './fontitem.module.scss';
import { Text } from '../../../../assets/icons/essentials';

interface Props {
  family: string;
  category: string;
  variants: string[];
  selected?: boolean;
  onClick?: () => void;
}

export const FontItem: React.FC<Props> = ({ family, category, variants, onClick, selected }) => {
  const hasRegular = variants.includes('regular');
  const hasBold = variants.includes('700');

  return (
    <button
      className={clsx(styles.container, selected && styles.selected)}
      onClick={() => onClick && (hasRegular || hasBold) && onClick()}>
      <div className={styles.focus} tabIndex={-1}>
        <div className={styles.heading}>
          <Text className={styles.icon} />
          <div className={styles.name}>{family}</div>
        </div>

        <div className={styles.badges}>
          <div className={styles.badge}>{category}</div>
          {hasRegular && <div className={styles.badge}>regular</div>}
          {hasBold && <div className={styles.badge}>bold</div>}
        </div>
      </div>
    </button>
  );
};
