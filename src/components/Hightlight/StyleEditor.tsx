import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import clsx from 'clsx';
import * as CSS from 'csstype';
import styles from './styleeditor.module.scss';
import { colors, textStyles } from './styles';
import { TextStyleGrid } from './TextStyleGrid';
import { ColorItem } from './ColorItem';
import { isin } from './utils';

interface Props {
  allStyles: CSS.Properties<string>;
  onChange: (style: CSS.Properties<string>) => void;
}

const colorSettings = [
  { id: 'backgroundColor', name: 'Background' },
  { id: 'color', name: 'Text' },
  { id: 'textDecorationColor', name: 'Line' },
];

export const StyleEditor: React.FC<Props> = ({ allStyles, onChange }) => {
  type valueType = keyof CSS.Properties<string> | null;
  const [valueFor, setValueFor] = useState<valueType>(null);

  const toggleValueFor = (value: string) => () => {
    if (valueFor === value) setValueFor(null);
    else setValueFor(value);
  };

  const textStyleChangeHandler = (style: CSS.Properties<string>) => {
    if (isin(style, allStyles)) {
      const newStyles = { ...allStyles };
      Object.keys(style).forEach(k => k in newStyles && delete newStyles[k]);
      onChange(newStyles);
    } else onChange({ ...allStyles, ...style });
  };

  const colorChangeHandler = (color: string) => () => {
    if (!valueFor) return;
    onChange({ ...allStyles, [valueFor]: color });
  };

  const _colorGrid = colors.map(color => (
    <ColorItem
      key={color}
      onClick={colorChangeHandler(color)}
      active={color === ((valueFor && allStyles[valueFor]) || 'inherit')}
      color={color}
    />
  ));

  const _colorSettings = colorSettings.map(s => (
    <div
      key={s.id}
      onClick={toggleValueFor(s.id)}
      className={clsx(styles.colorsetting, valueFor === s.id && styles.active)}>
      <ColorItem color={allStyles[s.id]} />
      <div className={styles.name}>{s.name}</div>
    </div>
  ));

  return (
    <div className={styles.container}>
      <label className={styles.label} children='Text Styles' />
      <TextStyleGrid
        textStyleItems={textStyles}
        allStyles={allStyles}
        onChange={textStyleChangeHandler}
      />

      <label className={styles.label} children='Colors' />
      <div>
        <div className={styles.colorsettings}>{_colorSettings}</div>
        <AnimatePresence>
          {valueFor != null && (
            <motion.div
              variants={variants}
              initial='hidegrid'
              animate='showgrid'
              exit='hidegrid'
              className={styles.motioncontainer}>
              <div className={styles.colorgrid}>{_colorGrid}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const variants: Variants = {
  hidegrid: {
    height: 0,
    opacity: 0,
    transition: {
      height: { type: 'tween', duration: 0.15, delay: 0.15 },
      opacity: { type: 'tween', duration: 0.15 },
    },
  },
  showgrid: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { type: 'tween', duration: 0.15 },
      opacity: { type: 'tween', duration: 0.15, delay: 0.15 },
    },
  },
};
