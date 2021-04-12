import { v4 as uuid } from 'uuid';
import { SettingItemI } from './types';
import { ColorPalette, Text, Reload, Information, Settings } from '../../assets/icons/essentials';
import { Themes } from './views/Themes';
import { Fonts } from './views/Fonts';
import { Reset } from './views/Reset';
import { About } from './views/About';
import { Dialogs } from './views/Dialogs';

export const settings: SettingItemI[] = [
  {
    id: uuid(),
    name: 'Themes',
    title: 'Theme settings',
    icon: <ColorPalette />,
    info: 'App, reader, code themes',
    content: Themes,
  },
  {
    id: uuid(),
    name: 'Fonts',
    title: 'Font settings',
    icon: <Text />,
    info: 'Various fonts',
    content: Fonts,
  },
  {
    id: uuid(),
    name: 'Dialogs',
    title: 'Dialog settings',
    icon: <Settings />,
    info: 'Dialog settings',
    content: Dialogs,
  },
  {
    id: uuid(),
    name: 'Reset',
    title: 'Reset',
    icon: <Reload />,
    info: 'Reset settings',
    content: Reset,
  },
  {
    id: uuid(),
    name: 'About',
    title: 'About this app',
    icon: <Information />,
    info: 'About this app',
    content: About,
  },
];
