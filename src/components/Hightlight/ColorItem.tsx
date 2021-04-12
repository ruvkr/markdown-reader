import styled from 'styled-components';
import clsx from 'clsx';
import styles from './coloritem.module.scss';
import { Close } from '../../assets/icons/essentials';

interface Props {
  color?: string;
  onClick?: () => void;
  active?: boolean;
}

export const ColorItem: React.FC<Props> = ({
  color,
  onClick,
  active = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.coloritem, active && styles.active)}>
      {typeof color === 'string' && color !== 'inherit' ? (
        <ScFocus
          $color={color}
          className={styles.focus}
          tabIndex={-1}></ScFocus>
      ) : (
        <div className={clsx(styles.focus, styles.nonefocus)} tabIndex={-1}>
          <div className={styles.icon}>
            <Close />
          </div>
        </div>
      )}
    </button>
  );
};

const ScFocus = styled.div<{ $color: string }>`
  background-color: ${p => p.$color};
`;
