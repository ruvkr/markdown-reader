import { ViewTypes } from '../../store/ui';

export interface IView {
  id: string;
  name: ViewTypes;
  path: string;
  component: React.ComponentType;
}
