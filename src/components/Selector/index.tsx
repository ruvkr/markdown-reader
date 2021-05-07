import { useState, useRef } from 'react';
import { Modal } from '../UI';
import { Toggler } from './Toggler';
import { Editor, EditorProps } from './Editor';
export * from './Toggler';

interface RenderTogglerProps {
  name: string;
  onClick: () => void;
  title?: string;
}

export interface SelectorProps<U> extends Omit<EditorProps<U>, 'onCancel' | 'onConfirm'> {
  title: string;
  renderToggler?: (props: RenderTogglerProps) => React.ReactElement | null;
  onChange?: (item: U) => void;
}

export const Selector = <U extends { [key: string]: any }>({
  title,
  renderToggler: RenderToggler = Toggler,
  onChange,
  ...rest
}: SelectorProps<U>): React.ReactElement => {
  const [showEditor, setShowEditor] = useState(false);
  const toggle = () => setShowEditor(p => !p);
  const infoRef = useRef(rest.currentSelected);

  return (
    <>
      <RenderToggler
        name={(rest.currentSelected && rest.currentSelected[rest.searchBy]) || title}
        onClick={toggle}
        title={title}
      />

      <Modal
        show={showEditor}
        title={title}
        close={toggle}
        onClose={() => infoRef.current && onChange && onChange(infoRef.current)}>
        <Editor onCancel={toggle} onConfirm={info => (infoRef.current = info as U)} {...rest} />
      </Modal>
    </>
  );
};
