import { useEffect } from 'react';
import Head from 'next/head';
import { useLazyQuery } from '@apollo/client';

import { Header, Footer } from '../';
import { MY_FAVOURITES } from '../../apollo/queries';
import { myFavourites, isLoggedInVar } from '../../apollo/cache';

const Layout = ({ children }) => {
  const [loadFavourites, { error, loading }] = useLazyQuery(MY_FAVOURITES, {
    onCompleted({ me }) {
      myFavourites(me);
    },
  });

  useEffect(() => {
    if (isLoggedInVar()) {
      loadFavourites();
    }
  }, [loadFavourites]);

  if (loading) return <p>Loading</p>;
  if (error) {
    console.error(error);
    return <p>An error occurred</p>;
  }

  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>

      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
