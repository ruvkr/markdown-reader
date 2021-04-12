import {
  ActionCreateInfo,
  ActionConfirmInfo,
  ActionTypes,
} from '../../store/alert';
import { ControlItem } from '../UI';

export type HandlerFunction<T extends ActionTypes> = (props: {
  action: ActionCreateInfo<T>;
  confirm: (info: ActionConfirmInfo<T>) => void;
  cancel: () => void;
}) => {
  controls?: ControlItem[];
  title: string;
  Content: React.ElementType;
};
