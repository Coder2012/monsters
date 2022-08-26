// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { Provider } from 'react-redux';

import { AppStore, RootState, setupStore } from './app/store';
import { server } from './mocks/server';
import { apiSlice } from './features/api/apiSlice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  setupListeners(store.dispatch);

  const wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );
  return { store, ...render(ui, { wrapper, ...renderOptions }) };
}

const store = setupStore({} as PreloadedState<RootState>);

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // This is the solution to clear RTK Query cache after each test
  store.dispatch(apiSlice.util.resetApiState());
});

// Clean up after the tests are finished.
afterAll(() => server.close());
