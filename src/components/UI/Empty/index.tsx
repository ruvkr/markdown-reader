import styles from './empty.module.scss';
import { FileTray } from '../../../assets/icons/essentials';

interface Props {
  heading: JSX.Element | string;
  description: JSX.Element | string;
  icon?: JSX.Element;
}

export const Empty: React.FC<Props> = ({ heading, description, icon = <FileTray />, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.info}>{description}</div>
      {children}
    </div>
  );
};
