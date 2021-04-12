import styled from 'styled-components';
import clsx from 'clsx';
import { Add } from '../../assets/icons/essentials';
import styles from './addbutton.module.scss';

interface Props {
  size?: number;
  active?: boolean;
  onClick?: () => void;
}

export const AddButton: React.FC<Props> = ({ size = 56, active = false, onClick }) => {
  return (
    <ScAddButton
      $size={size}
      title='Add files'
      className={clsx(styles.addbutton, active && styles.active)}
      onClick={onClick}>
      <div tabIndex={-1} className={styles.focus}>
        <div className={styles.icon}>
          <div className={styles.wave} />
          <Add />
        </div>
      </div>
    </ScAddButton>
  );
};

const ScAddButton = styled.button<{ $size: number }>`
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
`;
