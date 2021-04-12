import styled from 'styled-components';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props {
  title: string;
  icon: JSX.Element;
  onClick?: () => void;
  active?: boolean;
  size?: number;
}

export const NavItem: React.FC<Props> = ({ title, icon, onClick, active = false, size = 56 }) => {
  return (
    <ScNavItem
      $size={size}
      title={title}
      onClick={onClick}
      className={clsx(styles.navitem, active && styles.active)}
      style={{ width: size, height: size }}>
      <div tabIndex={-1} className={styles.focus}>
        <div className={styles.icon}>{icon}</div>
      </div>
    </ScNavItem>
  );
};

const ScNavItem = styled.button<{ $size: number }>`
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
`;
