import { useReducer, useRef } from 'react';
import * as CSS from 'csstype';
import { Tabs, TabItem } from '../UI';
import { useHighlightRange } from './useHighlightRange';
import { ColorWand, Close, ColorFill, ChatboxEllipses } from '../../assets/icons/essentials';
import { Highlights } from '../../store/files';
import { StyleEditor } from './StyleEditor';
import { Notes } from './Notes';
import { ConfigsStore, useConfigsStore, configsActions } from '../../store/configs';
import { readActions } from '../../store/read';
import { Icon } from '../QuickNavs';

interface Props {
  className?: string;
  size?: number;
  highlights?: Highlights;
}

interface State {
  size: number;
  selecting: boolean;
  selectedId: string | null;
  selectedStyles: CSS.Properties<string> | null;
  tagName: string;
  attributes: { [key: string]: string };
  highlights: Highlights;
}

const getStyles = (state: ConfigsStore) => state.rc.highlightStyle;

export const Hightlight: React.FC<Props> = ({ highlights: initialHighlights = {} }) => {
  const styles = useConfigsStore(getStyles);
  const [state, dispatch] = useReducer(reducer, {
    size: 40,
    selecting: false,
    selectedId: null,
    selectedStyles: null,
    tagName: 'span',
    highlights: initialHighlights,
    attributes: { class: 'highlighted' },
  });

  const { size, selecting, selectedId, tagName, attributes, selectedStyles, highlights } = state;

  const styleChangeHandler = (styles: CSS.Properties<string>) => {
    if (selectedId) {
      updateStyle(styles);
      storeHighlights(true);
      if (selectedStyles) dispatch({ selectedStyles: styles });
      else configsActions.updaterc({ highlightStyle: styles });
    } else configsActions.updaterc({ highlightStyle: styles });
  };

  const highlightHandler = () => {
    let newHighlights: Highlights | undefined;
    if (selectedId) newHighlights = removeHighlight();
    else newHighlights = highlight();
    storeHighlights(true, newHighlights);
  };

  const noteChangeHandler = (note: string | null) => {
    if (!selectedId) return;
    const newHighlights = { ...highlights };
    if (note) newHighlights[selectedId].note = note;
    else delete newHighlights[selectedId].note;
    dispatch({ highlights: newHighlights });
    storeHighlights(false, newHighlights);
  };

  const storeHighlights = (htmlUpdated: boolean, highlights?: Highlights) => {
    // update html
    if (htmlUpdated) {
      const html = document.getElementById('__mdr__')?.innerHTML;
      html && readActions.updateHtml(html);
    }

    // update highlights
    if (highlights) readActions.updateHighlights(highlights);
  };

  const {
    cancel,
    highlight,
    removeHighlight,
    updateStyle, //
  } = useHighlightRange({
    tagName,
    attributes,
    styles,
    highlights,
    stateChangeCallback: dispatch,
  });

  const titleRef = useRef('Highlight');
  const note = (selectedId && highlights[selectedId] && highlights[selectedId].note) ?? null;
  if (selectedId && selectedId in highlights) titleRef.current = highlights[selectedId].text;

  const tabs: TabItem[] = [
    {
      id: 'highlight',
      title: 'Highlight',
      isButton: true,
      onClick: highlightHandler,
      icon: ({ active, ...rest }) => <Icon {...rest} size={size} icon={<ColorWand />} active={Boolean(selectedId)} />,
    },
    {
      id: 'styles',
      title: 'Edit style',
      icon: props => <Icon {...props} size={size} icon={<ColorFill />} />,
      content: <StyleEditor allStyles={selectedStyles ?? styles} onChange={styleChangeHandler} />,
    },
    {
      id: 'note',
      title: 'Notes',
      icon: props => <Icon {...props} size={size} icon={<ChatboxEllipses />} disabled={selectedId === null} />,
      content: <Notes note={note} updateNote={noteChangeHandler} />,
    },
    {
      id: 'dismiss',
      title: 'Dismiss',
      isButton: true,
      onClick: cancel,
      icon: props => <Icon {...props} size={size} icon={<Close />} />,
    },
  ];

  return <Tabs show={Boolean(selecting || selectedId)} title={titleRef.current} tabItems={tabs} resetOnHide />;
};

const reducer = (state: State, payload: Partial<State>): State => ({
  ...state,
  ...payload,
});
