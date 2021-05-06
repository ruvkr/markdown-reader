import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Label } from '../../components/UI';
import { useReadStore, ReadStore, readActions } from '../../store/read';
import { useReaderScroll } from './useReaderScroll';
import { ScrollInfo } from './types';
import { Markdown } from '../../store/files';
import styles from './createdoc.module.scss';

interface Props {
  file?: Markdown | null;
  highlight?: string;
  forwardSetScroll?: React.MutableRefObject<
    ((to: string | number) => void) | undefined
  >;
}

const getHtml = (state: ReadStore) => state.html;

export const CreateDoc: React.FC<Props> = ({
  file,
  highlight,
  forwardSetScroll,
}) => {
  const html = useReadStore(getHtml);
  const containerRef = useRef<HTMLDivElement>(null);
  const title = useRef(file ? file.name : '');
  const updateTimeout = useRef<number | null>(null);
  const initialScroll = useRef(false);

  const scrollHandler = (info: ScrollInfo) => {
    updateTimeout.current != null && window.clearTimeout(updateTimeout.current);
    updateTimeout.current = window.setTimeout(() => {
      readActions.updateProgress(info.progress);
    }, 1000);
  };

  const { setScroll } = useReaderScroll(containerRef, scrollHandler);

  useEffect(() => {
    if (initialScroll.current || !file || !html) return;
    initialScroll.current = true;
    if (highlight) setScroll(`[highlightid="${highlight}"]`);
    else if (file.scroll != null) setScroll(file.scroll);
  }, [file, html, setScroll, highlight]);

  useEffect(() => {
    if (!file) return;
    const timeout = window.setTimeout(readActions.loadHtml, 500);
    return () => window.clearTimeout(timeout);
  }, [file]);

  useEffect(() => {
    if (forwardSetScroll) forwardSetScroll.current = setScroll;
  }, [forwardSetScroll, setScroll]);

  return (
    <div ref={containerRef} className={styles.reader} id='__mdrc__'>
      <ScLabel title={title.current} />
      {html && <div id='__mdr__' dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
};

const ScLabel = styled(Label)`
  padding: 1rem;
`;
