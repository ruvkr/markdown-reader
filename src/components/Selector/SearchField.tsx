import styled from 'styled-components';
import clsx from 'clsx';
import styles from './searchfield.module.scss';
import { Search } from '../../assets/icons/essentials';
import { Input, IconButton } from '../UI';

interface Props {
  value?: string;
  onSearch?: (value: string) => void;
  className?: string;
  focus?: boolean;
  placeholder?: string;
}

export const SearchField: React.FC<Props> = ({ value = '', onSearch, className, ...rest }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <ScInput value={value} onChange={onSearch} onSubmit={() => onSearch && onSearch(value)} {...rest}/>
      <ScSearchIcon icon={<Search />} onClick={() => onSearch && onSearch(value)} />
    </div>
  );
};

const ScInput = styled(Input)`
  width: 100%;
  min-height: 2.25rem;
  padding-right: 2.25rem;
  border-radius: 0.5rem;
`;

const ScSearchIcon = styled(IconButton)`
  border-radius: 0.5rem;
  position: absolute;
  right: 0;
`;
