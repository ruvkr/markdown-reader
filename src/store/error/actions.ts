import { v4 as uuid } from 'uuid';
import { Error } from './types';
import { get, set } from './useErrorStore';

export const errorActions = {
  add: addError,
  dismiss: dismissError,
};

function addError(error: { title: string; message: string }): void {
  const errors = get().errors ?? [];
  const newError: Error = { id: uuid(), ...error };
  const newErrors = [...errors, newError];
  set({ errors: newErrors });
}

function dismissError(errorID: string): void {
  const errors = get().errors;
  if (!errors) return;
  const newErrors = errors.filter(e => e.id !== errorID);
  set({ errors: newErrors.length > 0 ? newErrors : null });
}
