import { useMemo } from 'react';
import { ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { cache } from './cache';

let apolloClient;
let isServer = process.browser ? false : true;

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:4000'
      : process.env.NEXT_PUBLIC_GQL_SERVER,
});

function createApolloClient() {
  return new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
    name: 'tmdb-client',
    version: '0.1',
  });
}

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = !isServer && localStorage.getItem('token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // For SSG and SSR always create a new Apollo Client
  // if (typeof window === 'undefined') return _apolloClient;
  if (!isServer) return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
