import { gql } from '@apollo/client';

export const GET_POPULAR = gql`
  query getPopular(
    $page: Int
    $posterUrlSize: PosterSizes
    $backdropUrlSize: BackdropSizes
  ) {
    popular(page: $page) {
      page
      results {
        id
        backdrop_url(backdrop_size: $backdropUrlSize)
        poster_url(poster_size: $posterUrlSize)
        vote_average
      }
      total_pages
      total_results
    }
  }
`;
