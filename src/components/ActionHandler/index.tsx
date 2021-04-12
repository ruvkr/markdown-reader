import {
  useAlertStore,
  AlertStore,
  ActionTypes,
  actionAlert,
} from '../../store/alert';
import { Modal, ControlItem } from '../UI';
import { HandlerFunction } from './types';
import { handlers } from './views';

const getPendingAction = (state: AlertStore) => state.pendingAction;

export const ActionHandler: React.FC = () => {
  const action = useAlertStore(getPendingAction);

  let title = 'Alert';
  let controls: ControlItem[] | undefined;
  let Content: React.ElementType = () => null;

  if (action) {
    const handler = handlers[action.type] as HandlerFunction<ActionTypes>;
    ({ title, Content, controls } = handler({
      action: action,
      cancel: () => action && actionAlert.cancel(action.id),
      confirm: info => action && actionAlert.confirm(action.type, info),
    }));
  }

  return (
    <Modal
      show={action !== null}
      close={() => action && actionAlert.cancel(action.id)}
      title={title}
      controls={controls}
      children={<Content />}
    />
  );
};
