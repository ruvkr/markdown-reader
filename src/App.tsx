import { useEffect, useState } from 'react';
import { initializeStore } from './store';
import { viewActions } from './store/ui';
import { ErrorHandler } from './components/ErrorHandler';
import { ActionHandler } from './components/ActionHandler';
import { NotificationHandler } from './components/NotificationHandler';
import { Views } from './containers/Views';
import { Reader } from './containers/Reader';
import { ImageManager } from './containers/ImageManager';
import { LoadingScreen } from './containers/LoadingScreen';
import { FileControls } from './components/FileControls';
import { ThemeHandler } from './components/ThemeHandler';
// import { TestComponent } from './containers/TestComponent';

export const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let unsub: (() => void) | undefined;

    // initialize stores
    initializeStore().then(result => {
      unsub = result;
      viewActions.toggleLoading(false);
      setLoaded(true);
    });

    // cleanup function
    return () => unsub && unsub();
  }, []);

  return (
    <>
      <ThemeHandler />
      <LoadingScreen />
      <ErrorHandler />
      <NotificationHandler />
      <ActionHandler />
      <Reader />
      <ImageManager />
      <FileControls />
      {loaded && <Views />}
      {/* <TestComponent /> */}
    </>
  );
};
