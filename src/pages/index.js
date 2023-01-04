import {useState} from "react";
import Head from 'next/head';
import Image from'next/image';

import { useQuery } from "@apollo/client";
import { Pagination } from '../components';
import { GET_POPULAR } from '../apollo/queries/index';
import styles from '../../static/styles/home.module.css';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, loading } = useQuery(GET_POPULAR, {
    variables: { page: currentPage, posterUrlSize: "W780", backdropUrlSize: "W780", }
  });

  const loadPageHandler = (page) => () =>{
    setCurrentPage(() => {
      return page;
    })
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ul className={styles.grid}>
        {data?.popular?.results?.map((movie) => {
          return (

            <li className={styles.grid__item} key={movie.id}>
              <Image
                priority
                src={movie.poster_url}
                fill
                sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw
                "
                alt=""
              />
              <span className={styles.vote__average}>{movie.vote_average}</span>
            </li>
          );
        })}
      </ul>


      <Pagination
        currentPage={ currentPage }
        // totalPage={ data?.popular?.total_pages }
        onPageChange={ (page) => setCurrentPage(page) }
      />
    </>
  )
}
