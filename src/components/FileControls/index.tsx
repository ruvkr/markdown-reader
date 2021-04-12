import shallow from 'zustand/shallow';
import { AnimatePresence } from 'framer-motion';
import { useUiStore, UiStore, selectionActions } from '../../store/ui';
import { Popup } from '../UI';
import { Heading } from './Heading';
import { MainControls } from './MainControls';
import { MoreControls } from './MoreControls';
import styles from './styles.module.scss';
import { useBackHandler } from '../../hooks';

const getSelectionActions = (state: UiStore) => ({
  selectionMode: state.selectionMode,
  longPressedFile: state.longPressedFile,
  selectedFiles: state.selectedFiles,
  showMore: state.showMoreControls,
  expand: state.expandFileControls,
});

export const FileControls: React.FC = () => {
  const {
    selectionMode,
    selectedFiles,
    longPressedFile,
    showMore,
    expand,
  } = useUiStore(getSelectionActions, shallow);

  const long = longPressedFile !== null;
  const show = selectionMode || long;

  const files = longPressedFile
    ? [longPressedFile]
    : Object.values(selectedFiles);

  // handler back button
  useBackHandler({ handle: show, onBack: selectionActions.dismiss });

  return (
    <Popup
      show={show}
      onOutsideClick={() => selectionActions.dismiss()}
      blockOutsideActivity={long || expand}
    >
      <div className={styles.container}>
        <Heading
          selectionMode={selectionMode}
          files={files}
          onClick={selectionActions.toggleExpand}
          onClose={selectionActions.dismiss}
        />
        <AnimatePresence>
          {(long || expand) && (
            <MainControls
              expanded={expand}
              key='MainControls'
              files={files}
              onClick={selectionActions.dismiss}
              onMore={selectionActions.toggleShowMore}
            />
          )}
          {showMore && (
            <MoreControls
              key='MoreControls'
              files={files}
              onClick={selectionActions.dismiss}
            />
          )}
        </AnimatePresence>
      </div>
    </Popup>
  );
};
