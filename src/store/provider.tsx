'use client';

import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { store } from './store';
import { Provider } from 'react-redux';
import api from './apiSlice/baseQuery';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function ApiProviders({ children }: { children: React.ReactNode }) {
  return <ApiProvider api={api}>{children}</ApiProvider>;
}
