import { FaTwitter, FaInstagram } from 'react-icons/fa';

import styles from './footer.module.css';

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

const Footer = () => {
  return (
    <footer>
      <ul className={styles.social}>
        {Object.entries(socialLink).map(([socialLabel, fn]) => {
          const data = fn('avjpl');

          return (
            <li key={socialLabel}>
              <a className={styles.social__link} href={data.link}>
                <span className={styles.social__icon}>{data.icon}</span>{' '}
                {socialLabel}
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
