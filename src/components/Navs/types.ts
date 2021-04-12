import { ViewTypes } from '../../store/ui';

export interface NavItemI {
  id: string;
  to: string;
  name: ViewTypes;
  title: string;
  icon: JSX.Element;
  onClick?: () => void;
}
