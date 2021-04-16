import { useMemo } from 'react';
import clsx from 'clsx';
import shallow from 'zustand/shallow';
import moment from 'moment';
import styles from './styles.module.scss';
import { useFileStore, FileStore } from '../../store/files';
import { readActions } from '../../store/read';
import { useUiStore, UiStore, selectionActions } from '../../store/ui';
import { useConfigsStore, ConfigsStore, FileGridConfigs, configsActions } from '../../store/configs';
import { Menu, MenuItem, Button, IconSwitch, Label, FileIcon } from '../UI';
import { FileView } from '../FileView';
import {
  Text,
  ArrowUp,
  ArrowDown,
  Filter,
  Reader,
  CheckmarkCircle,
  Layers,
  Apps,
  List,
  Grid,
  CloseCircle,
  CalendarNumber,
} from '../../assets/icons/essentials';

const getFiles = (state: FileStore) => state.files;
const getListMods = (state: ConfigsStore) => state.fgc.listMode;
const getUiStore = (state: UiStore) => ({
  selectionMode: state.selectionMode,
  selectedFiles: state.selectedFiles,
});

export const FileGrid: React.FC = () => {
  const files = useFileStore(getFiles);
  const listMode = useConfigsStore(getListMods);
  const { selectionMode, selectedFiles } = useUiStore(getUiStore, shallow);

  const menuItems: MenuItem[] = useMemo(() => {
    const updateSort = (
      sortBy: FileGridConfigs['sortBy'],
      sortOrder: FileGridConfigs['sortOrder'] //
    ) => () => configsActions.updatefgc({ sortBy, sortOrder });

    const updateGroup = (
      groupBy: FileGridConfigs['groupBy'],
      groupOrder: FileGridConfigs['groupOrder'] //
    ) => () => configsActions.updatefgc({ groupBy, groupOrder });

    const updateView = (listMode: boolean) => () => {
      configsActions.updatefgc({ listMode });
    };

    return [
      {
        id: 'sortby',
        name: 'Sort By',
        icon: <Filter />,
        isSubMenu: true,
        items: [
          {
            id: 'sortby-name',
            name: 'Name',
            icon: <Text />,
            isSubMenu: true,
            items: [
              {
                id: 'sortby-name-ascending',
                name: 'Ascending',
                icon: <ArrowDown />,
                onClick: updateSort('name', 'ascending'),
              },
              {
                id: 'sortby-name-descending',
                name: 'Descending',
                icon: <ArrowUp />,
                onClick: updateSort('name', 'descending'),
              },
            ],
          },
          {
            id: 'sortby-datecreated',
            name: 'Date Created',
            icon: <CalendarNumber />,
            isSubMenu: true,
            items: [
              {
                id: 'sortby-datecreated-ascending',
                name: 'Ascending',
                icon: <ArrowDown />,
                onClick: updateSort('created', 'ascending'),
              },
              {
                id: 'sortby-datecreated-descending',
                name: 'Descending',
                icon: <ArrowUp />,
                onClick: updateSort('created', 'descending'),
              },
            ],
          },
          {
            id: 'sortby-datemodified',
            name: 'Date Modified',
            icon: <CalendarNumber />,
            isSubMenu: true,
            items: [
              {
                id: 'sortby-datemodified-ascending',
                name: 'Ascending',
                icon: <ArrowDown />,
                onClick: updateSort('modified', 'ascending'),
              },
              {
                id: 'sortby-datemodified-descending',
                name: 'Descending',
                icon: <ArrowUp />,
                onClick: updateSort('modified', 'descending'),
              },
            ],
          },
          {
            id: 'sortby-progress',
            name: 'Read Progress',
            icon: <Reader />,
            isSubMenu: true,
            items: [
              {
                id: 'sortby-progress-ascending',
                name: 'Ascending',
                icon: <ArrowDown />,
                onClick: updateSort('progress', 'ascending'),
              },
              {
                id: 'sortby-progress-descending',
                name: 'Descending',
                icon: <ArrowUp />,
                onClick: updateSort('progress', 'descending'),
              },
            ],
          },
        ],
      },
      {
        id: 'groupby',
        name: 'Group By',
        icon: <Layers />,
        isSubMenu: true,
        items: [
          {
            id: 'groupby-none',
            name: 'None',
            icon: <CloseCircle />,
            onClick: updateGroup('none', 'ascending'),
          },
          {
            id: 'groupby-alphabet',
            name: 'Alphabet',
            icon: <Text />,
            isSubMenu: true,
            items: [
              {
                id: 'groupby-alphabet-ascending',
                name: 'Ascending',
                icon: <ArrowDown />,
                onClick: updateGroup('alphabet', 'ascending'),
              },
              {
                id: 'groupby-alphabet-descending',
                name: 'Descending',
                icon: <ArrowUp />,
                onClick: updateGroup('alphabet', 'descending'),
              },
            ],
          },
          {
            id: 'groupby-datecreated',
            name: 'Date Created',
            icon: <CalendarNumber />,
            isSubMenu: true,
            items: [
              {
                id: 'groupby-datecreated-ascending',
                name: 'Ascending',
                icon: <ArrowDown />,
                onClick: updateGroup('created', 'ascending'),
              },
              {
                id: 'groupby-datecreated-descending',
                name: 'Descending',
                icon: <ArrowUp />,
                onClick: updateGroup('created', 'descending'),
              },
            ],
          },
          {
            id: 'groupby-datemodified',
            name: 'Date Modified',
            icon: <CalendarNumber />,
            isSubMenu: true,
            items: [
              {
                id: 'groupby-datemodified-ascending',
                name: 'Ascending',
                icon: <ArrowDown />,
                onClick: updateGroup('modified', 'ascending'),
              },
              {
                id: 'groupby-datemodified-descending',
                name: 'Descending',
                icon: <ArrowUp />,
                onClick: updateGroup('modified', 'descending'),
              },
            ],
          },
          {
            id: 'groupby-progress',
            name: 'Read Progress',
            icon: <Reader />,
            isSubMenu: true,
            items: [
              {
                id: 'groupby-progress-ascending',
                name: 'Ascending',
                icon: <ArrowDown />,
                onClick: updateGroup('progress', 'ascending'),
              },
              {
                id: 'groupby-progress-descending',
                name: 'Descending',
                icon: <ArrowUp />,
                onClick: updateGroup('progress', 'descending'),
              },
            ],
          },
        ],
      },
      '---',
      {
        id: 'select',
        name: 'Select',
        icon: <CheckmarkCircle />,
        isSubMenu: true,
        disabled: true,
      },
      {
        id: 'viewby',
        name: 'View',
        icon: <Apps />,
        isSubMenu: true,
        items: [
          {
            id: 'viewby-list',
            name: 'List view',
            icon: <List />,
            onClick: updateView(true),
          },
          {
            id: 'viewby-grid',
            name: 'Grid view',
            icon: <Grid />,
            onClick: updateView(false),
          },
        ],
      },
    ];
  }, []);

  const _files = files?.map(file => (
    <FileView
      key={file._id}
      listMode={listMode}
      selectionMode={selectionMode}
      selected={file._id in selectedFiles}
      name={file.name}
      info={moment(file.created).format('DD-MM-YY hh:mm a')}
      image={MDLogo}
      progress={file.progress}
      onClick={() => readActions.read(file)}
      onSelect={() => selectionActions.select(file)}
      onContextMenu={() => selectionActions.longpress(file)}
    />
  ));

  return (
    <div className={clsx(styles.container, listMode && styles.listview)}>
      <Label title='All files'>
        <Button
          name={selectionMode ? 'Cancel' : 'Select'}
          icon={selectionMode ? <CloseCircle /> : <CheckmarkCircle />}
          onClick={() => selectionActions.toggle()}
        />
        <IconSwitch
          on={listMode}
          offIcon={<Grid />}
          onIcon={<List />}
          onChange={v => configsActions.updatefgc({ listMode: v })}
        />
        <Menu zIndex={900} title='Options' items={menuItems} hideOnClick />
      </Label>

      <div className={styles.files}>{_files}</div>
    </div>
  );
};

const MDLogo = <FileIcon format='md' />;
