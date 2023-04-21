import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

import { GET_MOVIE_DETAILS, MY_FAVOURITES } from '../../apollo/queries';
import { useFavourites } from '../../hooks/useFavourites';

import styles from '../../../static/styles/movie.module.css';

const Movie = () => {
  const router = useRouter();
  const { addFavourite, removeFavourite } = useFavourites();
  const { movieId } = router.query;

  const { data: { me } = {} } = useQuery(MY_FAVOURITES);
  const {
    data: { details } = {},
    error,
    loading,
  } = useQuery(GET_MOVIE_DETAILS, {
    variables: {
      movieId: parseInt(movieId, 10),
      posterSize: 'W342',
      belongsToPosterUrl: 'W500',
      belongsToBackdropUrl: 'W780',
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const favouriteHandler =
    ({ favourites } = {}) =>
    () => {
      const likedMovieId = parseInt(movieId, 10);
      return favourites.find((favourite) => {
        return parseInt(favourite.id, 10) === likedMovieId;
      })
        ? removeFavourite({ variables: { data: { movieId: likedMovieId } } })
        : addFavourite({ variables: { data: { movieId: likedMovieId } } });
    };

  return (
    <div className={styles.movie__container}>
      <div className={styles.movie__image__container}>
        <Image
          src={details.backdrop_url}
          fill
          alt=''
          priority={true}
          objectFit='cover'
        />

        <div className={styles.movie__details}>
          <div className={styles.movie__poster__container}>
            <div style={{ height: '100%', position: 'relative' }}>
              <Image src={details.poster_url} fill alt='' priority={true} />
            </div>
          </div>

          <div className={styles.movie__info}>
            <div className={styles.movie__title__container}>
              <h1 className={styles.movie__title}>{details.title}</h1>
              <span>{details.formattedRuntime}</span>
            </div>

            <span className={styles.movie__releaseDate}>
              {details.release_date}
            </span>

            <div className={styles.movie__user__actions}>
              <span
                className={styles.movie__favourite}
                onClick={favouriteHandler(me)}
              >
                {me?.favourites?.find(({ id }) => {
                  return parseInt(id, 10) === parseInt(movieId, 10);
                }) ? (
                  <AiFillStar />
                ) : (
                  <AiOutlineStar />
                )}
              </span>
            </div>

            <p className={styles.movie__overview__heading}>Overview</p>
            <p className={styles.movie__overview}>{details.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;

/*
{
  "data": {
    "details": {
      "runtime": 87,
      "backdrop_url": "https://image.tmdb.org/t/p/original/bn3fAIckhOFEnrIZNCSbgHXRHLY.jpg",
      "poster_url": "https://image.tmdb.org/t/p/w342/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg",
      "popularity": 292.762,
      "title": "Minions: The Rise of Gru",
      "release_date": "29th June 2022",
      "overview": "A fanboy of a supervillain supergroup known as the Vicious 6, Gru hatches a plan to become evil enough to join them, with the backup of his followers, the Minions.",
      "vote_average": 7.489,
      "genres": [
        {
          "id": "16",
          "name": "Animation"
        },
        {
          "id": "35",
          "name": "Comedy"
        },
        {
          "id": "10751",
          "name": "Family"
        }
      ],
      "status": "Released",
      "spoken_languages": [
        {
          "english_name": "English"
        }
      ],
      "belongs_to_collection": {
        "id": "544669",
        "name": "Minions Collection",
        "poster_path": "/lqU48HkuPDpbumwHk9syT7FbxpC.jpg",
        "backdrop_path": "/62Qe28oi9PaK3P2ljDYUDTGAyST.jpg",
        "poster_url": "https://image.tmdb.org/t/p/original/lqU48HkuPDpbumwHk9syT7FbxpC.jpg",
        "backdrop_url": "https://image.tmdb.org/t/p/original/62Qe28oi9PaK3P2ljDYUDTGAyST.jpg"
      },
      "tagline": "A villain will rise.",
      "videos": {
        "results": [
          {
            "id": "630e8b051d3563007a18f038",
            "site": "YouTube",
            "key": "-ExA_Ojo1kY"
          },
          {
            "id": "630cb576ede1b00083c3b896",
            "site": "YouTube",
            "key": "ssb0TrPogr8"
          },
          {
            "id": "629e8340caa50837e3b31cfd",
            "site": "YouTube",
            "key": "HhIl_XJ-OGA"
          },
          {
            "id": "624487897caa4700476aac08",
            "site": "YouTube",
            "key": "6DxjJzmYsXo"
          },
          {
            "id": "5e7675312fe2fa001214920f",
            "site": "YouTube",
            "key": "OCSnxXtjFL0"
          },
          {
            "id": "60da15b017c443002d3df034",
            "site": "YouTube",
            "key": "3Zibb6lVCRw"
          }
        ]
      }
    }
  }
}
*/
