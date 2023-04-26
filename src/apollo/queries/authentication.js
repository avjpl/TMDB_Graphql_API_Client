import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation signup($data: UserCreateInput!) {
    signup(data: $data) {
      token
      username
    }
  }
`;

export const LOGIN = gql`
  mutation Login($data: UserLoginInput!) {
    login(data: $data) {
      token
      username
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const MY_FAVOURITES = gql`
  query GetMyFavourites {
    myFavourites @client
  }
`;
