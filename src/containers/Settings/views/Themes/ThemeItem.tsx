import clsx from 'clsx';
import styles from './themeitem.module.scss';
import { UnstyledButton } from '../../../../components/UI';
import { Checkmark } from '../../../../assets/icons/essentials';

export interface ThemeItemProps {
  name: string;
  title?: string;
  selected?: boolean;
  onClick?: () => void;
}

export const ThemeItem: React.FC<ThemeItemProps> = ({ selected, ...rest }) => {
  return (
    <UnstyledButton
      {...rest}
      badge={(selected && <Checkmark />) || undefined}
      classNames={{
        container: clsx(styles.container, selected && styles.selected),
        focus: styles.focus,
        name: styles.name,
        icon: styles.icon,
      }}
    />
  );
};
