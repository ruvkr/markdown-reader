import { useEffect, useRef } from 'react';
import { highlight as hr } from '../../libs/highlight-range';
import { convertStyle } from './utils';
import { Highlights } from '../../store/files';
import * as CSS from 'csstype';

export interface HighlightRangeConfigs {
  tagName?: string;
  attributes?: { [key: string]: string };
  styles?: CSS.Properties<string>;
  highlights?: Highlights;
  stateChangeCallback: (info: {
    selecting?: boolean;
    selectedId?: string | null;
    selectedStyles?: CSS.Properties<string> | null;
    highlights?: Highlights;
  }) => void;
}

export const useHighlightRange = ({
  tagName = 'span',
  attributes = {},
  styles = {},
  highlights = {},
  stateChangeCallback,
}: HighlightRangeConfigs) => {
  const selectingRef = useRef(false);
  const selectedIdRef = useRef<string | null>(null);

  const cancel = () => {
    stateChangeCallback({
      selecting: (selectingRef.current = false),
      selectedId: (selectedIdRef.current = null),
      selectedStyles: null,
    });
  };

  const updateStyle = (newStyles: CSS.Properties<string>) => {
    const element = document.getElementById('__mdrc__');
    if (!element || !selectedIdRef.current) return;
    const selector = `[highlightid="${selectedIdRef.current}"]`;
    const nodes = element.querySelectorAll(selector);
    const cssText = convertStyle('toCss', newStyles);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i] as HTMLElement;
      node.style.cssText = cssText;
    }
  };

  const highlight = (): Highlights | undefined => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount < 1) return;
    if (selection.rangeCount > 1) {
      const rangeStart = selection.getRangeAt(0);
      const rangeEnd = selection.getRangeAt(selection.rangeCount - 1);
      const newRange = document.createRange();
      newRange.setStart(rangeStart.startContainer, rangeStart.startOffset);
      newRange.setEnd(rangeEnd.endContainer, rangeEnd.endOffset);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }

    const range = selection.getRangeAt(0);
    const attrs = { ...attributes, style: convertStyle('toCss', styles) };
    const highlightId = hr.makeHighlight(range, tagName, attrs);
    if (!highlightId) return;

    const newHighlights = { ...highlights };
    newHighlights[highlightId] = { text: selection.toString() };

    stateChangeCallback({
      selecting: (selectingRef.current = false),
      selectedId: (selectedIdRef.current = highlightId),
      highlights: newHighlights,
    });

    selection.removeAllRanges();
    return newHighlights;
  };

  const removeHighlight = (): Highlights | undefined => {
    if (!selectedIdRef.current) return;
    hr.removeHighlight(selectedIdRef.current);
    const newHighlights = { ...highlights };
    delete newHighlights[selectedIdRef.current];

    stateChangeCallback({
      selecting: (selectingRef.current = false),
      selectedId: (selectedIdRef.current = null),
      selectedStyles: null,
      highlights: newHighlights,
    });

    return newHighlights;
  };

  useEffect(() => {
    const element = document.getElementById('__mdrc__');
    if (!element) return;

    const selectionHandler = () => {
      const selection = window.getSelection();
      if (selectingRef.current || !selection || selection.isCollapsed) return;
      stateChangeCallback({ selecting: (selectingRef.current = true) });
    };

    const clickHandler = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.hasAttribute('highlighted')) {
        const highlightId = target.getAttribute('highlightid');
        if (!highlightId || selectedIdRef.current === highlightId) return;
        const css = target.getAttribute('style');
        const styleObject = css ? convertStyle('toObject', css) : null;

        stateChangeCallback({
          selectedId: (selectedIdRef.current = highlightId),
          selectedStyles: styleObject,
        });
      } else {
        const selection = window.getSelection();

        if (
          selection &&
          selection.isCollapsed &&
          (selectingRef.current || selectedIdRef.current)
        ) {
          stateChangeCallback({
            selecting: (selectingRef.current = false),
            selectedId: (selectedIdRef.current = null),
            selectedStyles: null,
          });
        }
      }
    };

    document.addEventListener('selectionchange', selectionHandler);
    element.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('selectionchange', selectionHandler);
      element.removeEventListener('click', clickHandler);
    };
  }, [stateChangeCallback]);

  return {
    cancel,
    highlight,
    removeHighlight,
    updateStyle,
  };
};
