import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Error } from './types';

export type ErrorStore = { errors: Error[] | null };

const errorStoreCreator = (): ErrorStore => ({ errors: null });

export const useErrorStore = create<ErrorStore>(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? devtools(errorStoreCreator, 'error-store')
    : errorStoreCreator
);

export const { getState: get, setState: set } = useErrorStore;
