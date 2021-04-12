import { v4 as uuid } from 'uuid';
import {
  ActionInfo,
  ActionTypes,
  ActionCreateInfo,
  ActionConfirmInfo,
} from '../types';
import { get, set } from '../useAlertStore';

const promiseStore: {
  [id: string]: {
    resolve: (value: any) => void;
    reject: (reason: 'alert_canceled') => void;
  };
} = {};

export const actionAlert = {
  create: createAlert,
  confirm: confirmAlert,
  cancel: cancelAlert,
};

function createAlert<T extends ActionTypes>(
  type: T,
  info: ActionInfo<T>['create']
): Promise<ActionInfo<T>['confirm']> {
  const { actions: _all, pendingAction: _pending } = get();
  const id = uuid();
  const newAlert = { id, type, ...info };
  const all = [..._all, newAlert] as ActionCreateInfo<ActionTypes>[];
  const pending = _pending ?? all[0];
  set({ actions: all, pendingAction: pending });
  return new Promise((resolve, reject) => {
    promiseStore[id] = { resolve, reject };
  });
}

function confirmAlert<T extends ActionTypes>(
  type: T,
  info: ActionConfirmInfo<T>
) {
  const { actions: _all } = get();
  const all = _all.filter(alert => info.id !== alert.id);
  const pending = all.length > 0 ? all[0] : null;
  set({ actions: all, pendingAction: pending });
  promiseStore[info.id]?.resolve(info);
  delete promiseStore[info.id];
}

function cancelAlert(alertID: string) {
  const { actions: _all } = get();
  const all = _all.filter(alert => alertID !== alert.id);
  const pending = all.length > 0 ? all[0] : null;
  set({ actions: all, pendingAction: pending });
  promiseStore[alertID]?.reject('alert_canceled');
  delete promiseStore[alertID];
}
