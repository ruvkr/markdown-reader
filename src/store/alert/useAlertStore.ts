import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { ActionCreateInfo, ActionTypes, Notification } from './types';

export type AlertStore = {
  actions: ActionCreateInfo<ActionTypes>[];
  pendingAction: ActionCreateInfo<ActionTypes> | null;
  notifications: Notification[];
};

const alertStoreCreator = (): AlertStore => ({
  actions: [],
  pendingAction: null,
  notifications: [],
});

export const useAlertStore = create<AlertStore>(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? devtools(alertStoreCreator, 'alert-store')
    : alertStoreCreator
);

export const { getState: get, setState: set } = useAlertStore;
