import { useReducer, useRef, useEffect, Reducer } from 'react';
import Fuse from 'fuse.js';
import styled from 'styled-components';
import styles from './editor.module.scss';
import { ControlButtons, ControlItem } from '../UI';
import { Checkmark, ChevronBack } from '../../assets/icons/essentials';
import { SearchField } from './SearchField';

export interface RenderItemProps {
  onClick: () => void;
  selected?: boolean;
}

export interface EditorProps<U> {
  onCancel?: () => void;
  onConfirm?: (item: U) => void;
  renderItem: (props: RenderItemProps & U) => React.ReactElement | null;
  options: U[];
  currentSelected?: U;
  containerClassName?: string;
  showAll?: boolean;
  searchResultCount?: number;
  uniqeBy: keyof U;
  searchBy: keyof U;
}

interface State<U> {
  inputValue: string;
  fuzzyResult: U[];
  changed: boolean;
  selected?: U;
}

export const Editor = <U extends { [key: string]: any }>({
  onCancel,
  onConfirm,
  renderItem: RenderItem,
  options,
  containerClassName,
  currentSelected,
  showAll = false,
  searchResultCount = 4,
  uniqeBy,
  searchBy,
}: EditorProps<U>): React.ReactElement => {
  type UState = State<U>;
  type UReducer = Reducer<UState, Partial<UState>>;

  const [state, dispatch] = useReducer<UReducer>(reducer, {
    inputValue: (!showAll && currentSelected && currentSelected[searchBy]) || '',
    fuzzyResult: showAll ? options : [],
    selected: currentSelected,
    changed: false,
  });

  const { inputValue, fuzzyResult, changed, selected } = state;
  const fuseRef = useRef<Fuse<U> | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const changeHandler = (value: string = inputValue) => {
    dispatch({ inputValue: value });

    // timeout for not rapid search
    if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (!fuseRef.current) return;
      if (showAll && value.trim() === '') {
        dispatch({ fuzzyResult: options });
        return;
      }

      const fuzzyResult = fuseRef.current.search(value).slice(0, searchResultCount);
      dispatch({ fuzzyResult: fuzzyResult.map(r => r.item) });
    }, 300);
  };

  const _options = fuzzyResult.map(props => {
    const _selected = selected && selected[uniqeBy] === props[uniqeBy];
    const clickHandler = () => !_selected && dispatch({ changed: true, selected: props });
    return <RenderItem {...props} key={props[uniqeBy]} selected={_selected} onClick={clickHandler} />;
  });

  const controlButtons: ControlItem[] = [
    {
      id: 'confirm-select',
      name: 'Save',
      icon: <Checkmark />,
      disabled: !changed,
      onClick: () => {
        changed && selected && onConfirm && onConfirm(selected);
        onCancel && onCancel();
      },
    },
    {
      id: 'cancel-select',
      name: 'Cancel',
      icon: <ChevronBack />,
      onClick: onCancel,
    },
  ];

  useEffect(() => {
    if (fuseRef.current !== null) return;
    fuseRef.current = new Fuse(options, { keys: [searchBy as string], threshold: 0.4 });
  }, [options, searchBy]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current != null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <ScSearch
          $hasContent={fuzzyResult.length > 0}
          value={inputValue}
          onSearch={changeHandler}
          focus={!showAll}
          placeholder='Search'></ScSearch>
        <div className={containerClassName}>{_options}</div>
      </div>

      {/* controls */}
      <ControlButtons //
        controls={controlButtons}
        className={styles.controls}
      />
    </div>
  );
};

function reducer<U>(state: U, payload: Partial<U>): U {
  return { ...state, ...payload };
}

const ScSearch = styled(SearchField)<{ $hasContent: boolean }>`
  margin-bottom: ${p => (p.$hasContent ? 1 : 0)}rem;
`;
