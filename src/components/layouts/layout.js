import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import classnames from 'classnames';

import { FaTwitter, FaInstagram } from 'react-icons/fa';
import css from './layout.module.css';

const links = {
  home: '/',
  popular: '/popular',
  latest: '/latest',
  "top rated": '/topRated',
  search: '/search',
};

const socialLink = {
  twitter: (username) => ({
    link: `https://twitter.com/${username}`,
    icon: <FaTwitter />,
  }),
  instagram: (username) => ({
    link: `https://www.instagram.com/${username}`,
    icon: <FaInstagram />,
  }),
};

const Layout = ({ children }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>

      <header>
        <Link href='/' className={css.title}>
          Movies
        </Link>

        <nav>
          <ul className={css.nav}>
            {Object.entries(links).map(([linkLabel, linkTo]) => (
              <li key={linkLabel}>
                <Link
                  href={linkTo}
                  className={classnames(css.nav__link, {
                    [css['nav__link--active']]: currentRoute === linkTo,
                  })}
                >
                  {linkLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <ul className={css.social}>
          {Object.entries(socialLink).map(([soicalLabel, fn]) => {
            const data = fn('avjpl');

            return (
              <li key={soicalLabel}>
                <a className={css.social__link} href={data.link}>
                  <span className={css.social__icon}>{data.icon}</span>{' '}
                  {soicalLabel}
                </a>
              </li>
            );
          })}
        </ul>
      </footer>
    </>
  );
};

export default Layout;
