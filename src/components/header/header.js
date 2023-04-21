import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import classnames from 'classnames';

import { useApollo } from '../../apollo/client';

import { isLoggedInVar } from '../../apollo/cache';
import { IS_LOGGED_IN } from '../../apollo/queries';

import styles from './header.module.css';

const links = {
  home: '/',
  popular: '/popular',
  // latest: '/latest',
  // 'top rated': '/topRated',
  // search: '/search',
};

const Header = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  const router = useRouter();
  const apolloClient = useApollo();

  const currentRoute = router.pathname;

  const handleSignOut = (apolloClient, router) => (evt) => {
    evt.preventDefault();

    localStorage.removeItem('token');
    isLoggedInVar(false);

    apolloClient.cache.evict({ fieldName: 'me' });
    apolloClient.cache.gc();

    router.push('/');
  };

  return (
    <header>
      <Link href='/' className={styles.title}>
        Movies
      </Link>

      <nav>
        <ul className={styles.nav}>
          {data.isLoggedIn ? (
            <>
              {Object.entries(links).map(([linkLabel, linkTo]) => (
                <li key={linkLabel}>
                  <Link
                    href={linkTo}
                    className={classnames(styles.nav__link, {
                      [styles['nav__link--active']]: currentRoute === linkTo,
                    })}
                  >
                    {linkLabel}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type='button'
                  className={styles.nav__link}
                  onClick={handleSignOut(apolloClient, router)}
                >
                  Sign out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link className={styles.nav__link} href={'/signIn'}>
                Sign in
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
