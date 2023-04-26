import { useMutation } from '@apollo/client';

import {
  ADD_FAVOURITE,
  MY_FAVOURITES,
  REMOVE_FAVOURITE,
} from '../apollo/queries';

export const useFavourites = () => {
  const [addFavourite] = useMutation(ADD_FAVOURITE, {
    update(cache, { data: { addFavourite } }) {
      const data = cache.readQuery({
        query: MY_FAVOURITES,
      });

      cache.writeQuery({
        query: MY_FAVOURITES,
        data: {
          me: {
            ...data.me,
            favourites: [...data.me.favourites, addFavourite],
          },
        },
      });
    },
  });

  const [removeFavourite] = useMutation(REMOVE_FAVOURITE, {
    update(cache, { data: { removeFavourite } }) {
      cache.modify({
        id: `User:${removeFavourite.userId}`,
        fields: {
          favourites(favouritesRef, { readField }) {
            return favouritesRef.filter(
              (favouriteRef) =>
                removeFavourite.movieId !==
                parseInt(readField('id', favouriteRef), 10)
            );
          },
        },
      });
    },
  });

  return { addFavourite, removeFavourite };
};
