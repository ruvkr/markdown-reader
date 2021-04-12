import { useState, useRef } from 'react';
import { FontInfo } from '../../store/ui';
import { Modal } from '../UI';
import { Toggler } from './Toggler';
import { Editor } from './Editor';
import { Font } from '../../store/configs';

interface Props {
  fontInfos: FontInfo[] | null;
  currentFont: Font;
  currentFontSize: number;
  onSave?: (info: { font: Font; size: number }) => void;
}

export const FontSelector: React.FC<Props> = ({
  fontInfos,
  currentFont,
  currentFontSize,
  onSave,
}) => {
  const [showEditor, setShowEditor] = useState(false);
  const toggle = () => setShowEditor(p => !p);
  const infoRef = useRef<{
    font: Font;
    size: number;
  } | null>(null);

  return (
    <>
      <Toggler
        currentFont={currentFont}
        currentFontSize={currentFontSize}
        onClick={toggle}
      />

      <Modal
        show={showEditor}
        title={'Font selector'}
        close={toggle}
        onClose={() => {
          if (infoRef.current && onSave) onSave(infoRef.current);
          infoRef.current = null;
        }}>
        <Editor
          currentFont={currentFont}
          currentFontSize={currentFontSize}
          fontInfos={fontInfos}
          onCancel={toggle}
          onConfirm={info => {
            infoRef.current = info;
            toggle();
          }}
        />
      </Modal>
    </>
  );
};
