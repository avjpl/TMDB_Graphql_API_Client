import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

// eslint-disable-next-line react/display-name
const ApolloProviderWrapper = (mocks) => ({ children }) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
};

const customRender = (ui, { mocks, options } = {}) =>
  render(ui, { wrapper: ApolloProviderWrapper(mocks), ...options });

export const getByClassName = (cls) => document.getElementsByClassName(cls);
export const querySelectorAll = (str) => document.querySelectorAll(str);
export const querySelector = (str) => document.querySelector(str);

export { customRender as render };

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
