import { v4 as uuid } from 'uuid';
import { Notification } from '../types';
import { get, set } from '../useAlertStore';

export const notificationAlert = {
  create: createNotification,
  clear: clearNotification,
  update: updateNotification,
};

function createNotification(
  type: Notification['type'],
  message: string,
  expireTime: number = 5000
): string {
  const { notifications: _all } = get();
  const id = uuid();
  const newNotification: Notification = { type, id, message };
  const all = [..._all, newNotification];
  set({ notifications: all });
  if (type !== 'wait') window.setTimeout(() => clearNotification(id), expireTime);
  return id;
}

function clearNotification(id: string) {
  const { notifications: all } = get();
  if (!all.some(n => n.id === id)) return;
  const clean = all.filter(n => n.id !== id);
  set({ notifications: clean });
}

function updateNotification(
  id: string,
  type: Notification['type'],
  message: string,
  expireTime: number = 5000
) {
  const { notifications: _all } = get();
  const all = [..._all];
  const index = all.findIndex(n => n.id === id);
  if (index < 0) all.push({ id, type, message });
  else (all[index].type = type) && (all[index].message = message);
  set({ notifications: all });
  if (type !== 'wait') window.setTimeout(() => clearNotification(id), expireTime);
}
