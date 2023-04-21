import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { Pagination } from '../components';
import { GET_POPULAR } from '../apollo/queries/index';

import styles from '../../static/styles/home.module.css';

const Popular = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, loading } = useQuery(GET_POPULAR, {
    variables: {
      page: currentPage,
      posterUrlSize: 'W780',
      backdropUrlSize: 'W780',
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <>
      <Head>
        <title>Popular Movies</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <ul data-testid='movie-listing' className={styles.grid}>
        {data?.popular?.results?.map((movie) => {
          return (
            <li className={styles.grid__item} key={movie.id}>
                <Link href={`movie/${movie.id}`}>
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Image
                      priority={true}
                      src={movie.poster_url}
                      fill
                      sizes='
                      (max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw
                    '
                      alt=''
                    />
                  </div>
                  <span className={styles.vote__average}>
                    {movie.vote_average}
                  </span>
                </Link>

            </li>
          );
        })}
      </ul>

      <Pagination
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Popular;
