import { InMemoryCache, makeVar } from '@apollo/client';

const isBrowser = typeof window !== 'undefined';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isBrowser && isLoggedInVar();
          },
        },
        myFavourites: {
          read() {
            return isBrowser && myFavourites();
          },
        },
      },
    },
  },
});

export const isLoggedInVar =
  isBrowser && makeVar(!!localStorage.getItem('token'));

export const myFavourites = isBrowser && makeVar();
