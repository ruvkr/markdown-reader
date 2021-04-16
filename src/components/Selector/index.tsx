import { useState, useRef } from 'react';
import { Modal } from '../UI';
import { Toggler } from './Toggler';
import { Editor, EditorProps } from './Editor';
import { EllipsisHorizontal } from '../../assets/icons/essentials';

export interface SelectorProps<U> extends Omit<EditorProps<U>, 'onCancel' | 'onConfirm'> {
  title: string;
  icon?: JSX.Element;
  togglerIcon?: JSX.Element;
  onChange?: (item: U) => void;
}

export const Selector = <U extends { [key: string]: any }>({
  title,
  icon,
  togglerIcon = <EllipsisHorizontal />,
  onChange,
  ...rest
}: SelectorProps<U>): React.ReactElement => {
  const [showEditor, setShowEditor] = useState(false);
  const toggle = () => setShowEditor(p => !p);
  const infoRef = useRef(rest.currentSelected);

  return (
    <>
      <Toggler
        icon={icon}
        badge={togglerIcon}
        onClick={toggle}
        name={(rest.currentSelected && rest.currentSelected[rest.searchBy]) || title}
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
