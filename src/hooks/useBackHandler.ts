import { useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';

export function useBackHandler(configs: {
  handle: boolean;
  hash?: string;
  onBack?: () => void;
}) {
  const { handle, hash, onBack } = configs;
  const hashRef = useRef(hash);
  const onBackRef = useRef(onBack);

  const idRef = useRef<string | null>(null);
  const prevInfoRef = useRef<{
    pathname: string;
    hash: string;
    search: string;
    state: any;
  } | null>(null);

  // update refs
  useEffect(() => {
    hashRef.current = hash;
    onBackRef.current = onBack;
  }, [hash, onBack]);

  useEffect(() => {
    if (handle) {
      // store prev info for restoration
      prevInfoRef.current = {
        pathname: window.location.pathname,
        hash: window.location.hash,
        search: window.location.search,
        state: window.history.state,
      };

      // push new entry
      const hash = hashRef.current && encodeURI(`#${hashRef.current}`);
      window.history.pushState({ id: (idRef.current = uuid()) }, '', hash);

      // popstate event handler
      const popHandler = () => {
        if (listeners.last !== idRef.current) return;
        onBackRef.current && onBackRef.current();
        // remove listener and current id from listeners
        window.removeEventListener('popstate', popHandler);
        idRef.current && listeners.remove(idRef.current);
      };

      window.addEventListener('popstate', popHandler);
      listeners.add(idRef.current);

      // clenup
      return () => {
        window.removeEventListener('popstate', popHandler);
        idRef.current && listeners.remove(idRef.current);
      };
    }
    // replace hash
    else if (idRef.current && prevInfoRef.current) {
      const { pathname, hash, search, state: prevState } = prevInfoRef.current;
      const { state } = window.history;

      // restore prev infos
      if (state && state.id === idRef.current) {
        const url = pathname + search + hash;
        window.history.replaceState(prevState, '', url);
      }

      idRef.current = null;
      prevInfoRef.current = null;
    }
  }, [handle]);
}

// detect last popstate event handler
const listeners = {
  ids: [] as string[],
  last: null as string | null,

  // push new id to end
  add(id: string) {
    this.ids.push(id);
    this.last = id;
  },

  // remove id
  remove(id: string) {
    const index = this.ids.indexOf(id);
    if (index > -1) this.ids.splice(index, 1);
    this.last = this.ids.length > 0 ? this.ids[this.ids.length - 1] : null;
  },
};
