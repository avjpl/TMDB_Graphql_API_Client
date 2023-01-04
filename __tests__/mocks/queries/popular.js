import { GET_POPULAR } from '../../../src/apollo/queries';

export const singleMovie = {
  request: {
    query: GET_POPULAR,
    variables: {
      page: 1,
      posterUrlSize: 'W780',
      backdropUrlSize: 'W780',
    },
  },
  result: {
    data: {
      popular: {
        page: 1,
        results: [
          {
            id: 12,
            backdrop_url: 'https://image.tmdb.org/expectedBackdropUrl.jpg',
            poster_url: 'https://image.tmdb.org/expectedPosterUrl.jpg',
            vote_average: 3.1,
          },
        ],
        total_pages: 10,
        total_results: 10,
      },
    },
  },
};
