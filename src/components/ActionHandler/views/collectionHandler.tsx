import { useReducer } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import styles from './collection.module.scss';
import { ControlItem, Input, Checkbox, Button, IconButton } from '../../UI';
import { HandlerFunction } from '../types';
import {
  Checkmark,
  ChevronBack,
  Add,
  Close,
} from '../../../assets/icons/essentials';

interface State {
  collections: string[];
  selected: string[];
  newCollectionName: string;
  newCollections: string[];
  invalid: boolean;
  markInvalid: boolean;
}

export const collectionHandler: HandlerFunction<'addToCollection'> = ({
  action,
  cancel,
  confirm,
}) => {
  let collectionNames: string[] = [];

  const controls: ControlItem[] = [
    {
      id: 'confirm-action',
      name: 'Done',
      icon: <Checkmark />,
      onClick: () => confirm({ id: action.id, collectionNames }),
    },
    {
      id: 'cancel-action',
      name: 'Cancel',
      icon: <ChevronBack />,
      onClick: cancel,
    },
  ];

  const Content: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, {
      collections: action.allCollections,
      selected: [],
      newCollectionName: '',
      newCollections: [],
      invalid: true,
      markInvalid: false,
    });

    const {
      collections,
      selected,
      newCollectionName,
      newCollections,
      invalid,
      markInvalid,
    } = state;
    const hasCollections = collections.length > 0;

    const onChangeHandler = (value: string) => {
      const invalid = value.trim() === '' || collections.includes(value);
      dispatch({ newCollectionName: value, invalid });
    };

    const newHandler = () => {
      if (invalid) !markInvalid && dispatch({ markInvalid: true });
      else {
        dispatch({
          invalid: true,
          markInvalid: false,
          newCollectionName: '',
          collections: [...collections, newCollectionName],
          newCollections: [...newCollections, newCollectionName],
        });
      }
    };

    const removeHandler = (name: string) => (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.stopPropagation();
      if (newCollections.includes(name)) {
        const _collections = collections.filter(c => c !== name);
        const _selected = selected.filter(s => s !== name);
        const _newCollections = newCollections.filter(n => n !== name);
        collectionNames = _selected;
        dispatch({
          collections: _collections,
          selected: _selected,
          newCollections: _newCollections,
        });
      }
    };

    const selectHandler = (name: string) => () => {
      const _selected = selected.includes(name)
        ? selected.filter(s => s !== name)
        : [...selected, name];
      collectionNames = _selected;
      dispatch({ selected: _selected });
    };

    const _collections = collections.map(collection => (
      <motion.div
        key={collection}
        tabIndex={-1}
        onClick={selectHandler(collection)}
        variants={variants}
        initial={newCollections.includes(collection) ? 'hide' : 'show'}
        animate='show'
        exit='hide'
        className={styles.item}
      >
        <div tabIndex={-1} className={styles.foucs}>
          <Checkbox checked={selected.includes(collection)} />
          <div className={styles.name}>{collection}</div>
          <IconButton
            icon={<Close />}
            disabled={!newCollections.includes(collection)}
            onClick={removeHandler(collection)}
          />
        </div>
      </motion.div>
    ));

    return (
      <div className={styles.container}>
        <AnimatePresence>
          {hasCollections && (
            <motion.div
              className={styles.labelcontainer}
              variants={variants}
              initial={hasCollections ? 'show' : 'hide'}
              animate='show'
              exit='hide'
              children={<label className={styles.label}>All collections</label>}
            />
          )}
        </AnimatePresence>

        <div className={styles.allcollections}>
          <AnimatePresence>{_collections}</AnimatePresence>
        </div>

        <label className={styles.label}>Add new collection</label>
        <div className={styles.addnew}>
          <Input
            value={newCollectionName}
            onChange={onChangeHandler}
            invalid={markInvalid && invalid}
            onSubmit={newHandler}
          />
          <Button
            icon={<Add />}
            name='New'
            onClick={newHandler}
            disabled={markInvalid && invalid}
          />
        </div>
      </div>
    );
  };

  return {
    title: 'Add to collection',
    controls,
    Content,
  };
};

const reducer = (state: State, payload: Partial<State>): State => ({
  ...state,
  ...payload,
});

const variants: Variants = {
  hide: {
    height: 0,
    opacity: 0,
    transition: {
      height: { type: 'tween', duration: 0.15, delay: 0.15 },
      opacity: { type: 'tween', duration: 0.15 },
    },
  },
  show: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { type: 'tween', duration: 0.15 },
      opacity: { type: 'tween', duration: 0.15, delay: 0.15 },
    },
  },
};
