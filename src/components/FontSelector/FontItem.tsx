import clsx from 'clsx';
import styles from './fontitem.module.scss';
import { FontInfo } from '../../store/ui';
import { Font } from '../../store/configs';
import { Text } from '../../assets/icons/essentials';

interface Props {
  item: FontInfo;
  selected?: boolean;
  onClick?: (info: Font) => void;
}

export const FontItem: React.FC<Props> = ({ item, onClick, selected }) => {
  const hasRegular = item.variants.includes('regular');
  const hasBold = item.variants.includes('700');

  const clickHandler = () => {
    const weights: number[] = [];
    if (!onClick || (!hasRegular && !hasBold)) return;
    if (hasRegular) weights.push(400);
    if (hasBold) weights.push(700);
    const info: Font = { name: item.family, weights };
    onClick(info);
  };

  return (
    <button
      className={clsx(styles.container, selected && styles.selected)}
      onClick={clickHandler}
    >
      <div className={styles.focus} tabIndex={-1}>
        <div className={styles.heading}>
          <Text className={styles.icon} />
          <div className={styles.name}>{item.family}</div>
        </div>

        <div className={styles.badges}>
          <div className={styles.badge}>{item.category}</div>
          {hasRegular && <div className={styles.badge}>regular</div>}
          {hasBold && <div className={styles.badge}>bold</div>}
        </div>
      </div>
    </button>
  );
};
