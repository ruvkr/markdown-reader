import { useEffect, useRef, useState } from 'react';
import styles from './notes.module.scss';
import { Button } from '../UI';
import { Checkmark, Remove } from '../../assets/icons/essentials';

interface Props {
  note: string | null;
  updateNote: (note: string | null) => void;
}

export const Notes: React.FC<Props> = ({ note, updateNote }) => {
  const [value, set] = useState(note);
  const valueRef = useRef(value);
  const setValue = (value: string | null) => set((valueRef.current = value));

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = '';
    target.style.height = Math.min(target.scrollHeight, 240) + 'px';
    const value = target.value.trim() === '' ? null : target.value;
    setValue(value);
  };

  useEffect(() => {
    if (note !== valueRef.current) setValue(note);
  }, [note]);

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        placeholder='No notes'
        value={value ?? ''}
        rows={4}
        onChange={changeHandler}
      />

      <div className={styles.controls}>
        <Button
          icon={<Checkmark />}
          name='Save'
          onClick={() => updateNote(value)}
        />

        <Button
          icon={<Remove />}
          name='Delete'
          onClick={() => {
            setValue(null);
            updateNote(null);
          }}
        />

        <label className={styles.info} children='Click above to add or edit' />
      </div>
    </div>
  );
};
