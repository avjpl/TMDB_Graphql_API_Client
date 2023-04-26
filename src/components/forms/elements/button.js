import styles from './button.module.css';

const Button = ({ text, type }) => {
  return (
    <button className={styles.button} type={type}>
      {text}
    </button>
  );
};

export { Button };
