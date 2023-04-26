import { gql } from '@apollo/client';

export const ADD_FAVOURITE = gql`
  mutation addFavourite($data: FavouriteInput!) {
    addFavourite(data: $data) {
      id
    }
  }
`;

export const REMOVE_FAVOURITE = gql`
  mutation removeFavourite($data: FavouriteInput!) {
    removeFavourite(data: $data) {
      id
      movieId
      userId
    }
  }
`;

export const MY_FAVOURITES = gql`
  query myFavourites {
    me {
      id
      username
      favourites {
        id
      }
    }
  }
`;

export const GET_MOVIE_DETAILS = gql`
  query getMovieDetails(
    $movieId: Int!
    $posterSize: PosterSizes
    $belongsToPosterUrl: PosterSizes
    $belongsToBackdropUrl: BackdropSizes
  ) {
    details(id: $movieId) {
      id
      runtime
      formattedRuntime
      backdrop_url
      poster_url(poster_size: $posterSize)
      popularity
      title
      release_date
      overview
      vote_average
      genres {
        id
        name
      }
      status
      spoken_languages {
        english_name
      }
      belongs_to_collection {
        id
        name
        poster_path
        backdrop_path
        poster_url(poster_size: $belongsToPosterUrl)
        backdrop_url(backdrop_size: $belongsToBackdropUrl)
      }
      tagline
      videos {
        results {
          id
          site
          key
        }
      }
    }
  }
`;
