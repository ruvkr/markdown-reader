import { useConfigsStore, ConfigsStore, configsActions } from '../../../../store/configs';
import styles from './fonts.module.scss';
import { FontSizer } from './FontSizer';

const getFontSize = (state: ConfigsStore) => state.ac.fontSize;

export const AppFontSizer: React.FC = () => {
  const fontSize = useConfigsStore(getFontSize);

  return (
    <>
      <label className={styles.label}>Interface font size (will scale interface proportionally)</label>
      <FontSizer defaultValue={fontSize} onSizeChange={newSize => configsActions.updateac({ fontSize: newSize })} />
    </>
  );
};
