import clsx from 'clsx';
import styles from './fontitem.module.scss';
import { Text } from '../../../../assets/icons/essentials';
import { Font } from '../../../../store/configs';

interface FontItemProps extends Font {
  selected?: boolean;
  onClick?: () => void;
}

export const FontItem: React.FC<FontItemProps> = ({ name, weights, category, onClick, selected }) => {
  const hasRegular = weights.includes(400);
  const hasBold = weights.includes(700);

  return (
    <button
      className={clsx(styles.container, selected && styles.selected)}
      onClick={() => onClick && (hasRegular || hasBold) && onClick()}>
      <div className={styles.focus} tabIndex={-1}>
        <div className={styles.heading}>
          <Text className={styles.icon} />
          <div className={styles.name}>{name}</div>
        </div>

        <div className={styles.badges}>
          {category && <div className={styles.badge}>{category}</div>}
          {hasRegular && <div className={styles.badge}>regular</div>}
          {hasBold && <div className={styles.badge}>bold</div>}
        </div>
      </div>
    </button>
  );
};
