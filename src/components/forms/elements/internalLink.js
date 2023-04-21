import Link from 'next/link';

export const InternalLink = ({ text, href }) => {
  return <Link href={href}>{text}</Link>;
};
