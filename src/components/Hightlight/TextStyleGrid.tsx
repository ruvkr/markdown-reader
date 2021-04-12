import clsx from 'clsx';
import styles from './textstyles.module.scss';
import * as CSS from 'csstype';
import { TextStyle } from './types';
import { isin } from './utils';

interface Props {
  textStyleItems: TextStyle[];
  onChange?: (style: CSS.Properties<string>) => void;
  allStyles: CSS.Properties<string>;
}

export const TextStyleGrid: React.FC<Props> = ({
  allStyles,
  textStyleItems,
  onChange,
}) => {
  return (
    <div className={styles.grid}>
      {textStyleItems.map(item => (
        <button
          key={item.id}
          onClick={() => onChange && onChange(item.style)}
          className={clsx(
            styles.textstyle,
            isin(item.style, allStyles) && styles.active
          )}>
          <div
            className={styles.focus}
            style={item.itemStyle}
            tabIndex={-1}
            children={item.name}
          />
        </button>
      ))}
    </div>
  );
};
