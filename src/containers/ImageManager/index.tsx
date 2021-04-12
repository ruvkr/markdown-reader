import { useRef, useState } from 'react';
import styles from './styles.module.scss';
import { SlideExit, Label, IconSwitch } from '../../components/UI';
import { useImageManagerStore, ImageManagerStore, imActions } from '../../store/image-manager';
import { Add, Close, CheckmarkDone, List, Grid } from '../../assets/icons/essentials';
import { ControlItem } from '../../components/UI';
import { ImageGrid } from './ImageGrid';
import { Controls } from './Controls';

const getinfo = (state: ImageManagerStore) => state.manage;

export const ImageManager: React.FC = () => {
  const manage = useImageManagerStore(getinfo);
  const [listMode, setListMode] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const clickInput = () => inputRef.current && inputRef.current.click();
  const fileAddHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files && Array.from(event.target.files);
    selectedFiles && imActions.addMany(selectedFiles);
    event.target.value = '';
  };

  const submitHandler = () => {
    imActions.save();
    // imActions.dismiss();
  };

  const controls: ControlItem[] = [
    {
      id: 'add_image',
      name: 'Add',
      icon: <Add />,
      onClick: clickInput,
    },
    {
      id: 'submit_changes',
      name: 'Submit',
      icon: <CheckmarkDone />,
      onClick: submitHandler,
    },
    {
      id: 'cancel',
      name: 'Cancel',
      icon: <Close />,
      onClick: imActions.dismiss,
    },
  ];

  return (
    <SlideExit opened={manage !== null} onClose={imActions.dismiss}>
      <div className={styles.hidden}>
        <input type='file' multiple hidden ref={inputRef} onChange={fileAddHandler} />
      </div>

      <div className={styles.container}>
        <div className={styles.scrollarea}>
          <div className={styles.body}>
            <Label title='Manage images'>
              <IconSwitch on={listMode} offIcon={<Grid />} onIcon={<List />} onChange={value => setListMode(value)} />
            </Label>
            <div className={styles.message}>Multiple images can be added at once.</div>
            <ImageGrid listMode={listMode} />
          </div>
        </div>
        <Controls controls={controls} />
      </div>
    </SlideExit>
  );
};
