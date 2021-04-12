import { useReducer, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';
import { FontInfo } from '../../store/ui';
import { Font } from '../../store/configs';
import styles from './editor.module.scss';
import { SearchField } from './SearchField';
import { FontItem } from './FontItem';
import { ControlButtons, ControlItem, Slider } from '../UI';
import { Checkmark, ChevronBack } from '../../assets/icons/essentials';

interface State {
  inputValue: string;
  fuzzyResult: Fuse.FuseResult<FontInfo>[];
  selectedFont: Font;
  fontSize: number;
  changed: boolean;
}

interface Props {
  fontInfos: FontInfo[] | null;
  currentFont: Font;
  currentFontSize: number;
  onConfirm?: (info: { font: Font; size: number }) => void;
  onCancel?: () => void;
}

export const Editor: React.FC<Props> = ({
  currentFont,
  currentFontSize,
  fontInfos,
  onConfirm,
  onCancel,
}) => {
  const initialStateRef = useRef<State>({
    inputValue: currentFont.name,
    fuzzyResult: [],
    changed: false,
    selectedFont: currentFont,
    fontSize: currentFontSize,
  });

  const [state, dispatch] = useReducer(reducer, initialStateRef.current);
  const { inputValue, fuzzyResult, changed, selectedFont, fontSize } = state;
  const fuseRef = useRef<Fuse<FontInfo> | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const changeHandler = (value: string = inputValue) => {
    dispatch({ inputValue: value });
    // timeout for not rapid search
    if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (!fuseRef.current) return;
      const fuzzyResult = fuseRef.current.search(value).slice(0, 3);
      dispatch({ fuzzyResult });
    }, 300);
  };

  const results = fuzzyResult.map(result => (
    <FontItem
      key={result.refIndex}
      item={result.item}
      selected={selectedFont?.name === result.item.family || false}
      onClick={font => {
        dispatch({
          selectedFont: font,
          changed: true,
          inputValue: font.name,
        });
      }}
    />
  ));

  const controlButtons: ControlItem[] = [
    {
      id: 'confirm-select',
      name: 'Save',
      icon: <Checkmark />,
      disabled: !changed,
      onClick: () => {
        onConfirm && onConfirm({ font: selectedFont, size: fontSize });
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
    if (!fontInfos || fuseRef.current !== null) return;
    fuseRef.current = new Fuse(fontInfos, { keys: ['family'], threshold: 0.4 });
  }, [fontInfos]);

  useEffect(() => {
    return () => {
      // clear timeout
      timeoutRef.current != null && window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <label className={styles.label}>Search from google fonts</label>

        <SearchField
          value={inputValue}
          onChange={changeHandler}
          onSearch={changeHandler}
        />

        {/* search results */}
        <div className={styles.results}>{results}</div>

        {/* font size slider */}
        <Slider
          min={10}
          max={32}
          step={2}
          value={fontSize}
          unit='px'
          onChange={value => dispatch({ fontSize: value, changed: true })}
        />
      </div>

      {/* controls */}
      <ControlButtons controls={controlButtons} />
    </div>
  );
};

const reducer = (state: State, payload: Partial<State>): State => ({
  ...state,
  ...payload,
});
