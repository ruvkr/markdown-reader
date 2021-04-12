import { v4 as uuid } from 'uuid';
import { IView } from './types';
import { Home } from '../Home';
import { Files } from '../Files';
import { Highlights } from '../Highlights';
import { Settings } from '../Settings';

export const views: IView[] = [
  {
    id: uuid(),
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    id: uuid(),
    name: 'files',
    path: '/files',
    component: Files,
  },
  {
    id: uuid(),
    name: 'highlights',
    path: '/highlights',
    component: Highlights,
  },

  {
    id: uuid(),
    name: 'settings',
    path: '/settings/:setingsType?',
    component: Settings,
  },
];
